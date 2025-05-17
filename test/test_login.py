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
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    options.add_argument("--disable-gpu")
    options.add_argument("--headless=new")  
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()

def test_login_success(driver):
    driver.get("http://localhost:3000/logins")  
    time.sleep(3)  
    wait = WebDriverWait(driver, 10)

    email_input = wait.until(EC.visibility_of_element_located((By.ID, "email")))
    email_input.clear()
    email_input.send_keys("tonnam@gmail.com")

    password_input = wait.until(EC.visibility_of_element_located((By.ID, "password")))
    password_input.clear()
    password_input.send_keys("tonnam123")

    login_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    login_btn.click()

    wait.until(lambda d: d.current_url.startswith("http://localhost:3000") or "dashboard" in d.current_url)

    print("URL after login:", driver.current_url)
    assert driver.current_url.startswith("http://localhost:3000")  

def test_login_failure(driver):
    driver.get("http://localhost:3000/logins")
    time.sleep(3) 
    wait = WebDriverWait(driver, 10)

    email_input = wait.until(EC.visibility_of_element_located((By.ID, "email")))
    email_input.clear()
    email_input.send_keys("wrong@example.com")

    password_input = wait.until(EC.visibility_of_element_located((By.ID, "password")))
    password_input.clear()
    password_input.send_keys("wrongpassword")

    login_btn = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, "button[type='submit']")))
    login_btn.click()

    error_msg = wait.until(EC.visibility_of_element_located((By.CSS_SELECTOR, "p.text-red-500")))

    print("Error message text:", error_msg.text)
    assert any(x in error_msg.text.lower() for x in ["invalid", "error", "not found", "fail", "incorrect"])
