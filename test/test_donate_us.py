import pytest
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
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

def test_donateus_page_loads(driver):
    driver.get("http://localhost:3000/donate_us")
    wait = WebDriverWait(driver, 20)  

    header = wait.until(EC.visibility_of_element_located((By.XPATH, "//h1[contains(text(),'Donate Us')]")))
    assert header is not None

    buttons = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(text(),'Donate Now')]")))
    print(f"Found {len(buttons)} Donate Now buttons")
    assert len(buttons) > 0

def test_donateus_donate_now_button(driver):
    driver.get("http://localhost:3000/donate_us")
    wait = WebDriverWait(driver, 20)

    buttons = wait.until(EC.presence_of_all_elements_located((By.XPATH, "//button[contains(text(),'Donate Now')]")))
    assert len(buttons) > 0

    button = buttons[0]
    assert button.is_displayed()


    button.click()

    wait.until(lambda d: d.execute_script("return localStorage.getItem('selectedProductId')") != "0")

    selected_product_id = driver.execute_script("return localStorage.getItem('selectedProductId');")
    print(f"Selected product ID after click: {selected_product_id}")
    assert selected_product_id is not None and selected_product_id != "0"
