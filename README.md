<img src="ASSETS/electron.png" alt="JavaScript">

# Electron 배포를 위한 Installer 만들기.

## 1. electron-builder 설치

installer파일을 만들기 위해서 npm으로 electron-builder을 설치해야 합니다.
커맨드 창에서 아래의 명령어를 실행합니다.

**electron-builder설치**
```
     npm install --save-dev electron-builder
```
## 2. npm script 작성

package.json scripts의 하위 항목에 아래 내용을 추가합니다.

아래의 내용은 커맨드 창에서 입력할수 있는 명령어를 scripts 하위항목에 추가하는 내용입니다. 옵션에대한 좀더 자세한 내용은 아래 링크를 참조 바랍니다.

[CLI 상세 옵션](https://github.com/electron-userland/electron-builder#cli-usage)

**package.json**
```
    "build:osx": "build --mac",
    "build:linux": "npm run build:linux32 && npm run build:linux64",
    "build:linux32": "build --linux --ia32",
    "build:linux64": "build --linux --x64",
    "build:win": "npm run build:win32 && npm run build:win64", 
    "build:win32": "build --win --ia32",
    "build:win64": "build --win --x64"
```

## 3. build option 작성

package.json의 최상위 항목에 아래 내용을 추가합니다.

[build options 상세내용](https://github.com/electron-userland/electron-builder/wiki/Options)

**package.json**
```
    ...
    "build": {
    "productName": "HelloElectron",
    "appId": "com.electron.hello",
    "asar": true, //소스코드를 asar 포맷으로 압축 패키징 옵션
    "protocols" : {
        "name" : "helloElectron",
        "schemes" : ["helloelectron"]
    },
    "mac": { //mac용 옵션
      "target": [
        "default"
      ],
      "icon": "./resources/installer/Icon.icns"
    },
    "dmg": { //mac 인스톨 옵션
      "title": "HelloElectron",
      "icon": "./resources/installer/Icon.icns"
    },
    "win": {  // windows 옵션
      "target": [  //
        "zip",  // zip
        "nsis"  // 인스톨러 실행파일
      ],
      "icon": "./resources/installer/Icon.ico"
    },
    "linux": { //리눅스 옵션
      "target": [
        "AppImage", 
        "deb",
        "rpm",
        "zip",
        "tar.gz"
      ],
      "icon": "./resources/linuxicon"
    },
    "nsis":{
      "oneClick" : false, //nsis 기본 옵션은 원클릭 true
      "allowToChangeInstallationDirectory" :true // 디렉토리 변경 옵션
    },
    "directories": {
      "buildResources": "resources/installer/",
      "output": "dist/", // 빌드 후 결과물 저장 경로
      "app": "."
    }
  },
  ...
```
## 4. build os별 빌드 실행

**Mac 터미널**
```
npm run build:osx
```
**Windows 명령 프롬프트(CMD)**
```
npm run build:win
```
**Linux 터미널**
```
npm run build:linux
```
## 5. Multi Platform Build 설정방법
기본적으로 빌드를 실행하는 운영체제의 결과물만 정상적으로 빌드가 됩니다. 하지만 하나의 운영체제에서 다른 OS플랫폼의 빌드를 실행하려면 아래와 같은 준비가 필요합니다.

**Mac**
1. HomeBrew를 설치 합니다. [HomeBrew설치법 Blog](http://humble.tistory.com/26)
2. Mac에서 Windows를 build하기 위하여 brew를 통해 아래의 패키지를 설치합니다.
```
brew install wine --without-x11
brew install mono
```
3. Mac에서 Linux를 build하기 위하여 brew를 통해 아래의 패키지를 설치합니다.
```
brew install gnu-tar graphicsmagick xz
brew install rpm
```
**Linux**
1. Linux에서 Windows를 build하기 위하여 아래의 패키지를 설치합니다.

```
sudo add-apt-repository ppa:ubuntu-wine/ppa -y
sudo apt-get update
sudo apt-get install --no-install-recommends -y wine1.8
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 3FA7E0328081BFF6A14DA29AA6A19B38D3D831EF
echo "deb http://download.mono-project.com/repo/debian wheezy main" | sudo tee /etc/apt/sources.list.d/mono-xamarin.list
sudo apt-get update
sudo apt-get install --no-install-recommends -y mono-devel ca-certificates-mono
```

**Windows**
Docker를 사용합니다.

[Multi Platform Build에 관련 내용](https://github.com/electron-userland/electron-builder/wiki/Multi-Platform-Build)

## 6. Mutli Pltform Build 실행

package.json 파일의 scripts 부분에 아래의 명령어를 추가합니다.

**package.json**
```
    "build": "npm run build:linux && npm run build:osx && npm run build:win"
```
커맨드 창에서 아래와 같이 실행합니다.
```
npm run build
```
    
## [Electron API Demo ➤](https://github.com/cionman/04_Electron_API_DEMO) 


 



