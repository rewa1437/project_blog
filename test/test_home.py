from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pytest

@pytest.fixture(scope="module")
def driver():
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()

def test_home_page_elements(driver):
    driver.get("http://localhost:3000")
    wait = WebDriverWait(driver, 10)

 
    logo = wait.until(EC.presence_of_element_located((By.CSS_SELECTOR, 'img[alt="Random Image"]')))
    assert logo is not None

  
    main_title = wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'No Money No Honey')]")))
    assert main_title is not None

   
    learn_more_btn = wait.until(EC.presence_of_element_located((By.XPATH, "//button[contains(text(), 'Learn More')]")))
    assert learn_more_btn is not None


    blog_header = wait.until(EC.presence_of_element_located((By.XPATH, "//h1[contains(text(), 'Blog')]")))
    assert blog_header is not None

    print("Home page tests passed!")
