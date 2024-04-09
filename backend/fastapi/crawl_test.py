from selenium.webdriver import ActionChains
from selenium.webdriver.common.by import By

from undetected_chromedriver import Chrome, ChromeOptions
from selenium.webdriver.common.keys import Keys
import requests
import time
import re

import emotion_classifier

music_list = []
pattern = r'(?<=v=)[\w-]+'


def youtube_music(driver):
    parent_element = driver.find_element(By.XPATH, "/html/body/ytmusic-app/ytmusic-app-layout/div["
                                                   "4]/ytmusic-browse-response/div[2]/div["
                                                   "4]/ytmusic-section-list-renderer/div["
                                                   "2]/ytmusic-playlist-shelf-renderer/div[2]")
    length = len(parent_element.find_elements(By.XPATH, "*"))

    # -------------------------- for문 처리 --------------------------
    for i in range(length):
        idx = i + 1

        base_xpath = f"//*[@id='contents']/ytmusic-responsive-list-item-renderer[{idx}]"

        try:
            # 제목
            title = driver.find_element(By.XPATH, base_xpath + '/div[2]/div[1]/yt-formatted-string/a').text
            # 가수
            artist = driver.find_element(By.XPATH, base_xpath + '/div[2]/div[3]/yt-formatted-string[1]/a').text

            # 노래 재생
            driver.find_element(By.XPATH, base_xpath + '/div[1]/ytmusic-item-thumbnail-overlay-renderer/div/ytmusic'
                                                       '-play-button-renderer/div/yt-icon').click()

            # 모달 창 열기
            driver.find_element(By.XPATH, '/html/body/ytmusic-app/ytmusic-app-layout/ytmusic-player-bar/div['
                                          '3]/tp-yt-paper-icon-button[1]/tp-yt-iron-icon').click()

            # 유튜브 코드
            youtube_code = re.search(pattern, driver.current_url).group(0)

            # url 긁어오기
            image_url = (driver.find_element(By.XPATH, '//*[@id="song-image"]/yt-img-shadow/img').get_attribute('src'))

            # 가사 긁어오기
            if idx == 1:
                driver.find_element(By.XPATH, '//*[@id="tabsContent"]/tp-yt-paper-tab[2]/div').click()

            lyrics = driver.find_element(By.XPATH, '//*[@id="contents"]/ytmusic-description-shelf-renderer/yt-formatted'
                                                   '-string[2]').text

            music_list.append([youtube_code, title, artist, image_url, lyrics])

        except Exception as e:
            continue
        finally:
            # 모달 창 닫기 & 스크롤 다운
            ActionChains(driver).send_keys(Keys.ESCAPE).scroll_by_amount(0, 50).perform()
            idx += 1

    # -------------------------- for문 처리 끝 --------------------------


if __name__ == '__main__':
    options = ChromeOptions()
    # options.add_argument('--headless')  # 화면 표시하지 않음
    # options.add_argument('headless')
    # options.add_argument('window-size=1920x1080')
    # options.add_argument("disable-gpu")
    driver = Chrome(options=options)
    driver.implicitly_wait(10)
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

        password_input = driver.find_element(By.NAME, 'Passwd')
        password_input.send_keys('1Betterthan2?')
        password_input.send_keys(Keys.RETURN)

        time.sleep(3)

        # 4. 로그인 완료 후 YouTube Music 장르 페이지로 리다이렉트
        driver.get('https://music.youtube.com/playlist?list=RDCLAK5uy_kSZ85qHgyyqQCKkCtrjbA3m8Am7GfOTcQ')

        youtube_music(driver)
        response_list = []
        emotion_classifier.init()
        # -------------------------- for문 처리 --------------------------
        i = 1
        for music in music_list:
            music.append(emotion_classifier.analyze_init(music[4]))
            if None in music:
                continue
            response_list.append({
                "musicYoutubeId": music[0],
                "musicTitle": music[1],
                "musicSingerName": music[2],
                "musicCoverUrl": music[3],
                "musicCategory": "SPRING",
                "musicLyrics": music[4],
                "musicEmotion": music[5].model_dump()})
            print(i)
            i += 1
        # -------------------------- for문 처리 끝 --------------------------

        # print(response_list)

        res = requests.post("https://daumnal.n-e.kr/api/musics", json={"musics": response_list})
        print(res)

    finally:
        # 브라우저 종료
        driver.quit()
