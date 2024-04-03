import numpy as np
import requests


def recomm(diary_emo, music_ids, music_emoes, authorization):
    list = np.array([diary_emo.fear,
                     diary_emo.surprise,
                     diary_emo.angry,
                     diary_emo.sadness,
                     diary_emo.neutral,
                     diary_emo.happiness,
                     diary_emo.disgust])
    list = list / np.linalg.norm(list)

    mat = np.array([[0, 0, 0, 0, 0, 0, 0]])
    for music_emo in music_emoes:
        emo_list = np.array([music_emo.fear,
                             music_emo.surprise,
                             music_emo.angry,
                             music_emo.sadness,
                             music_emo.neutral,
                             music_emo.happiness,
                             music_emo.disgust])
        mat = np.append(mat, [emo_list / np.linalg.norm(emo_list)], axis=0)

    mat = np.delete(mat, 0, axis=0)
    product_list = mat @ list
    print(product_list)

    response = requests.get("https://daumnal.n-e.kr/api/diaries/recent-music",
                            headers={"Authorization": authorization})
    # print(response.status_code)

    json_list = response.json()['data']['musics']

    recomm_log = []
    for j in json_list:
        recomm_log.append(j['musicId'])

    while music_ids[np.argmax(product_list)].id in recomm_log:
        product_list = np.delete(product_list, np.argmax(product_list))

    # print(music_ids[np.argmax(product_list)].id)
    return music_ids[np.argmax(product_list)]
