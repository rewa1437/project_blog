import pytest
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

def test_about_page_content(driver):
    driver.get("http://localhost:3000/about")  

    wait = WebDriverWait(driver, 10)
    wait.until(EC.visibility_of_element_located((By.TAG_NAME, "h1")))

    # เช็ค header ชื่อทีม
    header = driver.find_element(By.TAG_NAME, "h1")
    assert "พบกับทีมพัฒนาของเรา" in header.text

    # เช็คชื่อทีม 3 คน
    names = [e.text for e in driver.find_elements(By.CSS_SELECTOR, "h3.text-xl.font-semibold")]
    expected_names = [
        "ANUPAP PASAKORNHIRAN",
        "WANTANA RU_ARN",
        "NONGNAPAS PANKLAI"
    ]
    for name in expected_names:
        assert name in names

    # เช็คตำแหน่งงาน
    roles = [e.text for e in driver.find_elements(By.CSS_SELECTOR, "p.text-sm.text-gray-500")]
    expected_roles = [
        "Front-end Developer",
        "Back-end Developer",
        "UI/UX Designer"
    ]
    for role in expected_roles:
        assert role in roles
