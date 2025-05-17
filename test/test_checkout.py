import pytest
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException, NoAlertPresentException

@pytest.fixture(scope="function")
def driver():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new") 
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()

def wait_for_alert(driver, timeout=15):
    wait = WebDriverWait(driver, timeout)
    try:
        alert = wait.until(lambda d: d.switch_to.alert)
        return alert
    except (TimeoutException, NoAlertPresentException):
        return None

def test_checkout_form_submit(driver):
   
    driver.get("http://localhost:3000")  
    driver.execute_script("""
        window.localStorage.setItem('selectedProductId', '1');
        window.localStorage.setItem('user', JSON.stringify({
            user_id: '1',
            username: 'tonnam',
            rank: 1
        }));
    """)

    driver.get("http://localhost:3000/donate_us/checkout") 
    wait = WebDriverWait(driver, 30) 


    assert driver.current_url.endswith("/donate_us/checkout"), f"Unexpected URL: {driver.current_url}"

    try:
  
        wait.until(EC.visibility_of_element_located((By.TAG_NAME, "form")))
    except TimeoutException:
        print("Form not found on checkout page")
        assert False, "Checkout form did not appear"

    
    wait.until(EC.visibility_of_element_located((By.NAME, "fullname"))).send_keys("tonnam")
    wait.until(EC.visibility_of_element_located((By.NAME, "email"))).send_keys("tonnam@gmail.com")
    wait.until(EC.visibility_of_element_located((By.NAME, "phone"))).send_keys("0123456789")


    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']"))).click()

 
    time.sleep(2)

  
    alert = wait_for_alert(driver)
    assert alert is not None, "Expected alert but none appeared"
    assert "ขอบคุณ" in alert.text
    alert.accept()

    
    wait.until(lambda d: d.current_url == "http://localhost:3000/" or d.current_url.endswith("/"))

