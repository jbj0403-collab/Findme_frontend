# 사이트 데이터 입력과 자동 갱신

## 데이터 입력 위치

원본 데이터 폴더의 label 분류별 `list.csv`에 새 행을 추가합니다.

| 원본 폴더 | label | 대시보드 분류 |
| --- | --- | --- |
| `label_1\list.csv` | 1 | 정상사이트 |
| `label_2\list.csv` | 2 | 도박사이트 |
| `label_3\list.csv` | 3 | 기타 사이트 |
| `label_4\list.csv` | 4 | 기타 사이트 |
| `label_5\list.csv` | 5 | 유해 사이트 |

CSV에는 `id`, `fld`, `insertDate` 열이 필요합니다. `id`는 고유 ID, `fld`는 도메인/사이트 주소, `insertDate`는 등록 시각입니다. 예를 들면 다음과 같습니다.

```csv
id,fld,insertDate
new001,example.org,2026-10-22 14:30:00
```

캡처 이미지가 있으면 같은 label 폴더 안에 `사이트ID\main.png`로 둡니다. 예를 들어 `label_2\new001\main.png`입니다. CSV에 행만 추가해도 건수·로그에는 나타나고, 이미지는 있을 때 갤러리에 나타납니다.

## 자동 갱신 실행

Vite 개발 서버와 별도 PowerShell 창에서 watcher를 실행합니다. `SourceFolder` 값은 현재 `website_data` 폴더의 실제 경로로 지정합니다. 파일 변경 확인은 기본 10초마다 수행하고, 원본 전체를 30분마다 다시 가져옵니다.

```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\watch-website-data.ps1 -SourceFolder "<현재 website_data 폴더의 전체 경로>" -PollSeconds 10 -RefreshMinutes 30
```

`<현재 website_data 폴더의 전체 경로>` 부분을 실제 경로로 바꿔 실행합니다. 예를 들어 폴더를 `D:\monitoring\website_data`로 옮겼다면 `-SourceFolder "D:\monitoring\website_data"`로 지정합니다.

Watcher는 `list.csv`와 `main.png`의 변경을 빠르게 확인해 변경이 있으면 바로 다시 가져오며, 변경 여부와 관계없이 30분마다 전체 데이터를 재가져옵니다. 대시보드는 생성된 `public\monitoring-data\sites.json` 파일을 3초 간격으로 읽습니다.

### 원본 폴더 경로를 옮긴 경우

Watcher는 실행할 때 지정한 경로를 계속 감시합니다. 폴더를 다른 위치로 옮기면 기존 PowerShell 창에서 `Ctrl+C`로 watcher를 중지한 뒤, 위 명령의 `-SourceFolder`를 새 경로로 바꿔 다시 실행해야 합니다. 실행 중인 watcher의 경로를 바꿀 때는 새 경로로 재시작해야 합니다.
