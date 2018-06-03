import requests
from bs4 import BeautifulSoup

def scrape(URL):
    page = requests.get(URL)
    soup = BeautifulSoup(page.content, 'html.parser')
    body = []
    body.append(soup.title.string)
    for tag in soup.find_all('p'):
        a = tag.get_text()
        body.append(a.strip())
    return body