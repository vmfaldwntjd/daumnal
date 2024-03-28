from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys
# from selenium.webdriver.support.ui import WebDriverWait
# from selenium.webdriver.support import expected_conditions as EC
# import undetected_chromedriver as uc

from undetected_chromedriver import Chrome, ChromeOptions
from selenium.webdriver.common.keys import Keys
import time

options = ChromeOptions()
options.add_argument('--headless')  # 화면 표시하지 않음
driver = Chrome(options=options)


def youtube_music():
    try:
        # 4. 로그인 완료 후 YouTube Music 장르 페이지로 리다이렉트
        driver.get('https://music.youtube.com/moods_and_genres')
        time.sleep(3)

        # ----------------------------------------------------------

        # 장르 선택
        genre_name = driver.find_element(By.XPATH, '//*[@id="items"]/ytmusic-navigation-button-renderer[6]/button')
        genre_name.click()
        time.sleep(2)

        # 플리 선택
        playlist_name = driver.find_element(By.XPATH, '//*[@id="items"]/ytmusic-two-row-item-renderer[1]/div['
                                                      '1]/div/yt-formatted-string/a')
        playlist_name.click()
        time.sleep(2)

        # 플리 저장
        playlist_item1 = driver.find_element(By.XPATH, '//*[@id="contents"]/ytmusic-responsive-list-item-renderer[1]')
        playlist_item2 = driver.find_element(By.XPATH, '//*[@id="contents"]/ytmusic-responsive-list-item-renderer[2]')

        # -------------------------- for문 처리 --------------------------

        # 제목
        playlist_element_title = playlist_item1.find_element(By.XPATH, './/div[2]/div[1]/yt-formatted-string/a').text
        print(playlist_element_title)
        # 가수
        playlist_element_singer = playlist_item1.find_element(By.XPATH,
                                                              './/div[2]/div[3]/yt-formatted-string[1]/a').text
        print(playlist_element_singer)

        # 노래 재생
        playlist_item1.find_element(By.XPATH, './/div[1]/ytmusic-item-thumbnail-overlay-renderer/div/ytmusic-play'
                                              '-button-renderer').click()
        time.sleep(2)
        # 모달 창 열기
        driver.find_element(By.XPATH, '//*[@id="layout"]/ytmusic-player-bar/div[2]').click()
        time.sleep(2)
        # url 긁어오기
        playlist_element_url = driver.find_element(By.XPATH, '//*[@id="song-image"]/yt-img-shadow/img').get_attribute(
            'src')
        print(playlist_element_url)
        # 가사 긁어오기
        driver.find_element(By.XPATH, '//*[@id="tabsContent"]/tp-yt-paper-tab[2]/div').click()
        time.sleep(2)
        playlist_element_lyrics = driver.find_element(By.XPATH, '//*[@id="contents"]/ytmusic-description-shelf'
                                                                '-renderer/yt-formatted-string[2]').text
        # print(playlist_element_lyrics)
        # 모달 창 닫기
        ActionChains(driver).send_keys(Keys.ESCAPE).perform()
        time.sleep(2)

        # -------------------------- for문 처리 끝 --------------------------

        driver.find_element(By.XPATH, '//*[@id="play-pause-button"]').click()
        youtube(playlist_element_title, playlist_element_singer)

    except Exception as e:
        print(e)


def youtube(playlist_element_title, playlist_element_singer):
    try:

        # youtube 이동
        youtube_base_url = 'https://www.youtube.com/results?search_query='
        # -------------------------- for문 처리 --------------------------

        # 제목 가수로 검색
        driver.get(youtube_base_url + playlist_element_title + '+' + playlist_element_singer + '+topic')
        time.sleep(2)

        target_vidio = driver.find_element(By.XPATH, f"//*[contains(text(), '[Audio]')]")
        target_vidio.click()
        time.sleep(2)

        current_url = driver.current_url
        url_code = current_url.split('?v=', 1)[1]
        print(url_code)
        # -------------------------- for문 처리 끝 --------------------------

    except Exception as e:
        print(e)


if __name__ == "__main__":
    try:
        driver.get(
            'https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.youtube.com%2Fsignin'
            '%3Faction_handle_signin%3Dtrue%26app%3Ddesktop%26hl%3Dko%26next%3Dhttps%253A%252F%252Fwww.youtube.com'
            '%252Fpremium&ec=65620&hl=ko&ifkv=ATuJsjwS82g3IBEVEMxVJ9I3wfQ9li-L19_hciWW_93c8djskVu22l55-neGii-j_'
            '-TEmwoTuqXI1A&passive=true&service=youtube&uilel=3&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh'
            '=S1628018301%3A1709711508535870&theme=glif')

        # 3. 로그인 정보 입력
        email_input = driver.find_element(By.ID, 'identifierId')
        email_input.send_keys('wjswwkd@gmail.com')
        email_input.send_keys(Keys.RETURN)

        time.sleep(5)  # 페이지 로딩 대기

        password_input = driver.find_element(By.NAME, 'Passwd')
        password_input.send_keys('1Betterthan2?')
        password_input.send_keys(Keys.RETURN)

        time.sleep(3)  # 페이지 로딩 대기

        youtube_music()
        # youtube()

    finally:
        # 브라우저 종료
        driver.quit()
