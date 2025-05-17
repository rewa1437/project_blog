import pytest
import time
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

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

def test_navbar_logged_out(driver):
    driver.get("http://localhost:3000")
    wait = WebDriverWait(driver, 10)
    
    
    assert wait.until(EC.visibility_of_element_located((By.LINK_TEXT, "Home")))
    assert wait.until(EC.visibility_of_element_located((By.LINK_TEXT, "Blog")))
    
    donate = wait.until(EC.visibility_of_element_located((By.XPATH, "//span[text()='Donate']")))
    donate.click()
   
    alert = driver.switch_to.alert  
    assert "กรุณาล็อคอิน" in alert.text
    alert.accept()

   
    login_btn = wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Login']")))
    assert login_btn.is_displayed()

def test_navbar_logged_in(driver):
    driver.get("http://localhost:3000")
    wait = WebDriverWait(driver, 10)
    
 
    driver.execute_script("""
        window.localStorage.setItem('user', JSON.stringify({
            user_id: '123',
            username: 'testuser',
            rank: 2
        }));
    """)
    
    driver.refresh()
    time.sleep(1)  
    
   
    user_div = wait.until(EC.visibility_of_element_located((By.XPATH, "//div[contains(text(),'testuser')]")))
    classes = user_div.get_attribute("class")
    assert "bg-blue-500" in classes  
    
  
    donate_link = wait.until(EC.visibility_of_element_located((By.LINK_TEXT, "Donate")))
    assert donate_link.get_attribute("href").endswith("/donate_us")
    
   
    logout_btn = wait.until(EC.visibility_of_element_located((By.XPATH, "//button[text()='Logout']")))
    logout_btn.click()
    time.sleep(1)
    assert driver.execute_script("return window.localStorage.getItem('user')") is None
