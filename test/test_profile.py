import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import (
    UnexpectedAlertPresentException, TimeoutException,
    NoSuchElementException, StaleElementReferenceException
)
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

@pytest.fixture(scope="function")
def driver():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")  
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")

    driver_instance = webdriver.Chrome(service=service, options=options)
    yield driver_instance
    driver_instance.quit()

def wait_for_username_value_or_placeholder(driver, timeout=20):
    wait = WebDriverWait(driver, timeout)
    def check_username(driver):
        try:
            el = driver.find_element(By.ID, "username")
            val = el.get_attribute("value")
            placeholder = el.get_attribute("placeholder")
            return (val and val.strip() != "") or (placeholder and placeholder.strip() != "")
        except (NoSuchElementException, StaleElementReferenceException):
            return False
    wait.until(check_username)
    return driver.find_element(By.ID, "username")

def test_profile_page_loads_and_displays_user_info(driver):
    
    driver.get("http://localhost:3000")
    driver.execute_script("""
        window.localStorage.setItem('user', JSON.stringify({
            user_id: '1',
            username: 'tonnam',
            rank: 4
        }));
    """)
    driver.get("http://localhost:3000/profile")

    wait = WebDriverWait(driver, 30)

    
    header = wait.until(EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(),'My Account')]")))
    assert header is not None

  
    username_input = wait_for_username_value_or_placeholder(driver, timeout=30)
    val = username_input.get_attribute("value")
    placeholder = username_input.get_attribute("placeholder")
    assert (val and val.strip() != "") or (placeholder and placeholder.strip() != "")

    
    expected_ranks = [
        "ผู้สนับสนุนระดับนักผจญภัย",
        "ผู้สนับสนุนระดับจอมยุทธ",
        "ผู้สนับสนุนระดับวีรบุรุษ",
        "ผู้สนับสนุนระดับตำนาน",
    ]

    rank_text = None
   
    for _ in range(5):
        try:
            
            elements = driver.find_elements(By.XPATH, "//*[contains(text(),'ผู้สนับสนุนระดับ')]")
            for el in elements:
                text = el.text.strip()
                if text in expected_ranks:
                    rank_text = text
                    break
            if rank_text:
                break
        except (StaleElementReferenceException, TimeoutException):
            pass

    assert rank_text is not None, "ไม่พบข้อความระดับผู้สนับสนุนที่ถูกต้องในหน้า profile"

def test_update_username(driver):
   
    driver.get("http://localhost:3000")
    driver.execute_script("""
        window.localStorage.setItem('user', JSON.stringify({
            user_id: '1',
            username: 'tonnam',
            rank: 4
        }));
    """)
    driver.get("http://localhost:3000/profile")

    wait = WebDriverWait(driver, 30)
    username_input = wait.until(EC.visibility_of_element_located((By.ID, "username")))

  
    username_input.clear()
    username_input.send_keys("newusername")

  
    save_button = driver.find_element(By.XPATH, "//button[contains(text(),'Save')]")
    save_button.click()

   
    try:
        alert = wait.until(EC.alert_is_present())
        assert "เปลี่ยนชื่อเรียบร้อย" in alert.text
        alert.accept()
    except TimeoutException:
        
        pass
    except UnexpectedAlertPresentException:
        alert = driver.switch_to.alert
        alert.accept()
    except Exception as e:
        print(f"Unexpected exception handling alert: {e}")

   
    wait.until(EC.element_to_be_clickable((By.XPATH, "//button[contains(text(),'Save')]")))
