from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager  

service = Service(ChromeDriverManager().install())
options = webdriver.ChromeOptions()


driver = webdriver.Chrome(service=service, options=options)

try:
    driver.get("http://localhost:3000")  

    wait = WebDriverWait(driver, 10)


    blog_link = wait.until(EC.presence_of_element_located((By.LINK_TEXT, "Blog")))

    assert blog_link is not None

    print("Test passed: Found Blog link!")

except Exception as e:
    print("Test failed:", e)

finally:
    driver.quit()
