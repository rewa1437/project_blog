import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from selenium.common.exceptions import TimeoutException

@pytest.fixture(scope="function")
def driver():
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")  
    options.add_argument("--no-sandbox")
    options.add_argument("--disable-dev-shm-usage")
    service = Service(ChromeDriverManager().install())
    driver_instance = webdriver.Chrome(service=service, options=options)
    yield driver_instance
    driver_instance.quit()

def test_register_success(driver):
    driver.get("http://localhost:3000/register")
    wait = WebDriverWait(driver, 20)

   
    wait.until(EC.visibility_of_element_located((By.ID, "username"))).send_keys("user123")
    driver.find_element(By.ID, "email").send_keys("user123@gmail.com")
    driver.find_element(By.ID, "password").send_keys("a123")
    driver.find_element(By.ID, "rePassword").send_keys("a123")

    
    driver.find_element(By.XPATH, "//button[contains(text(),'Sign Up')]").click()

   
    modal_title = wait.until(EC.visibility_of_element_located((By.XPATH, "//h2[contains(text(),'Registration Successful')]")))
    assert modal_title is not None


