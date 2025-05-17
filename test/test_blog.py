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
    options.add_experimental_option('excludeSwitches', ['enable-logging'])
    driver = webdriver.Chrome(service=service, options=options)
    yield driver
    driver.quit()

def test_blog_page_loads(driver):
    driver.get("http://localhost:3000/blog")
    wait = WebDriverWait(driver, 10)
    time.sleep(2) 

   
    header = wait.until(EC.visibility_of_element_located((By.TAG_NAME, "h1")))
    assert "Blog" in header.text

   
    posts = driver.find_elements(By.CSS_SELECTOR, "div.grid > a > div")
    assert len(posts) == 3

def test_blog_links_and_images(driver):
    driver.get("http://localhost:3000/blog")
    wait = WebDriverWait(driver, 10)
    time.sleep(2)


    links = driver.find_elements(By.CSS_SELECTOR, "div.grid a")
    expected_paths = ["/blog/learning/manage", "/blog/learning/saving", "/blog/learning/invest"]

    for link, expected_path in zip(links, expected_paths):
        href = link.get_attribute("href")
        assert expected_path in href

       
        img = link.find_element(By.TAG_NAME, "img")
        assert img.is_displayed()
        src = img.get_attribute("src")
      
        assert any(ext in src for ext in [".jpg", ".jpeg", ".png"])

