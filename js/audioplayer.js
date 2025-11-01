const tracks = [
    { 
      file: "track1.mp3",
      title: "SMD",
      author: "Romanceplanet",
      explicit: true,
      cover: "track1.jpg",
      links: { 
        spotify:"https://open.spotify.com/track/4PaF6SmswulhdBKWWJTLkV?si=4a647545331d48d1",
        youtube:"https://music.youtube.com/watch?v=V0ou4Vk-I9E&si=ACZNsl8qgA_t1P0S",
        yandex:"https://music.yandex.ru/track/134946213?utm_source=web&utm_medium=copy_link"
      } 
    },
    {
      file: "track2.mp3",
      title: "PLAIN WHITE TEE",
      author: "Romanceplanet",
      explicit: false,
      cover: "track2.jpg",
      links: {
        spotify:"https://open.spotify.com/track/0mS9cDuFWaCYjKf38ujfet?si=39294e9b0e784234",
        youtube:"https://music.youtube.com/watch?v=SIUFO6BKHc4&si=bq3RvmiaWUwkQace",
        yandex:"https://music.yandex.ru/track/134824849?utm_source=web&utm_medium=copy_link"
      }
    },
    { 
      file: "track3.mp3",
      title: "Moonflowers",
      author: "meganeko",
      explicit: false,
      cover: "track3.jpg",
      links: {
        spotify:"https://open.spotify.com/track/5YVcQX21kwiGJA5j1SbsGI?si=9ccd588faebd4cbb",
        youtube:"https://music.youtube.com/watch?v=gLB2WxP520s&si=dIZVVIaxhWoPHsnH"
      }
    },
    {
      file: "track4.mp3",
      title: "God bless you",
      author: "china"
    },
    {
      file: "track5.mp3",
      title: "Crazy",
      author: "Creo",
      explicit: false,
      cover: "track5.jpg",
      links: {
        spotify:"https://open.spotify.com/track/2ex9wWoRG6TpmB3nlOKaXi?si=387c00d55a1f4792",
        youtube:"https://music.youtube.com/watch?v=_SpzUHZqDOU&si=MQa7-ycvXfPY9cwK",
        yandex:"https://music.yandex.ru/track/94192879?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track6.mp3",
      title: "Miami Hotline - Vol. 3",
      author: "Demonicity",
      explicit: false,
      cover: "track6.jpg"
    },
    {
      file: "track7.mp3",
      title: "Machina",
      author: "Dex Arson",
      explicit: false,
      cover: "track7.jpg",
      links: {
        spotify: "https://open.spotify.com/track/59dtbpqYIFogNsDayzyYky?si=3bf359c381354659",
        youtube: "https://music.youtube.com/watch?v=gP7WJDQ05Qc&si=xO80vr3kD2V9m2rg"
      }
    },
    {
      file: "track8.mp3",
      title: "Supernova",
      author: "Xtrullor",
      explicit: false,
      cover: "track8.jpg",
      links: {
        spotify: "https://open.spotify.com/track/3QRObjsiUeBbV6JXVKaJZT?si=0665fab72bd74810",
        youtube: "https://music.youtube.com/watch?v=dI51suFmzEk&si=uBSw8vAtx5qj7X-H"
      }
    },
    {
      file: "track9.mp3",
      title: "Forsaken Neon",
      author: "Dimrain47",
      explicit: false,
      cover: "track9.jpg"
    },
    {
      file: "track10.mp3",
      title: "FALL FROM THE SKY PT. 2",
      author: "Romanceplanet, STAKILLAZ",
      explicit: false,
      cover: "track10.jpg",
      links: {
        spotify: "https://open.spotify.com/track/7tBfGvT74zlqZ8RHQkBSz0?si=d54bea6de3704965",
        youtube: "https://music.youtube.com/watch?v=_j0zh4vmvaQ&si=f07g_pzxlrGrtB4f",
        yandex: "https://music.yandex.ru/track/138389049?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track11.mp3",
      title: "Biome Fest",
      author: "C418",
      cover: "track11.jpg",
      links: {
        spotify: "https://open.spotify.com/track/7ozOcSZlwhqqdrCVJiwbpp?si=f8f86c9f493c4a0f",
        youtube: "https://music.youtube.com/watch?v=KcwaDLQ0j_g&si=LoI0ZIdGnYO4RXdH"
      }
    },
    {
      file: "track12.mp3",
      title: "Taswell",
      author: "C418",
      explicit: false,
      cover: "track12.jpg",
      links: {
        spotify: "https://open.spotify.com/track/6PwVnlNwVKGD18lWNCh1It?si=ff31577ef1a04b05",
        youtube: "https://music.youtube.com/watch?v=Mj6jF7I2s10&si=9kOqggZYQJZw6xUx"
      }
    },
    {
      file: "track13.mp3",
      title: "Strad",
      author: "C418",
      explicit: false,
      cover: "track13.jpg",
      links: {
        spotify: "https://open.spotify.com/track/6jdrVuAbbvcEbUXy1V2HxM?si=0619054eacf944c2",
        youtube: "https://music.youtube.com/watch?v=zaUEqJEPTOg&si=q004PzQLSt9zX86I"
      }
    },
    {
      file: "track14.mp3",
      title: "Dog",
      author: "C418",
      explicit: false,
      cover: "track14.jpg",
      links: {
        spotify: "https://open.spotify.com/track/4YLXjoYmRGIXstTLtloHf2?si=eacab8b3e1254603",
        youtube: "https://music.youtube.com/watch?v=PJVvGvPDLWc&si=gHUumb0a0tyDpezT"
      }
    },
    {
      file: "track15.mp3",
      title: "otherside",
      author: "Lena Raine",
      explicit: false,
      cover: "track15.jpg",
      links: {
        spotify: "https://open.spotify.com/track/4PtJNlcpEGyNAkYy44m5fI?si=ceef2458fea94010",
        youtube: "https://music.youtube.com/watch?v=kK81m-A3qpU&si=neQBscvCTkeHysiV",
        yandex: "https://music.yandex.ru/track/93189311?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track16.mp3",
      title: "Still Loving You",
      author: "Scorpions",
      explicit: false,
      cover: "track16.jpg",
      links: {
        spotify: "https://open.spotify.com/track/5ctrWrTwgy5xLZA4OWgY5O?si=22583fb298f442ea",
        youtube: "https://music.youtube.com/watch?v=vJrYN-_BXws&si=AcKtrtpDAvZXKA3e",
        yandex: "https://music.yandex.ru/track/28036311?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track17.mp3",
      title: "Lunar Abyss",
      author: "Lchavasse",
      explicit: false,
      cover: "track17.jpg",
      links: {
        spotify: "https://open.spotify.com/track/6Cl9JID0QVTYAXiyKaj6QN?si=2178d23cc0ca47fc",
        youtube: "https://music.youtube.com/watch?v=3fSu6NkFhIw&si=XiwDjwEc1TDcm4hn"
      }
    },
    {
      file: "track18.mp3",
      title: "ЯḄЬ",
      author: "AXIUS LIИK",
      explicit: false,
      cover: "track18.png",
      links: {
        spotify: "https://open.spotify.com/track/78FvkNiJX2tETDQUVKwl1b?si=f0873e2e7971494f",
        youtube: "https://music.youtube.com/watch?v=ifmY_2T722Q&si=YHbwDvm4d9NCxl-I"
      }
    },
    {
      file: "track19.mp3",
      title: "Noise",
      author: "Hensonn",
      explicit: true,
      cover: "track19.jpg",
      links: {
        spotify: "https://open.spotify.com/track/4wh8h1sAISoAh1hmUs18eF?si=1ce64173fd2141c3",
        yandex: "https://music.yandex.ru/track/116050467?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track20.mp3",
      title: "Tears",
      author: "Amos Roddy",
      explicit: false,
      cover: "track20.jpg",
      links: {
        spotify: "https://open.spotify.com/track/37Bx2hUjIOvcNwHRpQhquo?si=6d56798dee9f4e01",
        youtube: "https://music.youtube.com/watch?v=Eo0QjT7mkzs&si=X_wtRyk8KHlgN28b",
        yandex: "https://music.yandex.ru/track/138956344?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track21.mp3",
      title: "Classic Pursuit",
      author: "cYsmix",
      explicit: false,
      cover: "track21.jpg"
    },
    {
      file: "track22.mp3",
      title: "Lay All Your Love On Me",
      author: "ABBA",
      explicit: false,
      cover: "track22.jpg",
      links: {
        spotify: "https://open.spotify.com/track/4euAGZTszWPrriggYK0HG9?si=3e130bc724a74b8a",
        youtube: "https://music.youtube.com/watch?v=5mHzaIehRTE&si=dbGdH9UPJGcygZcH",
        yandex: "https://music.yandex.ru/track/25790?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track23.mp3",
      title: "Intro",
      author: "The xx",
      explicit: false,
      cover: "track23.png",
      links: {
        spotify: "https://open.spotify.com/track/2usrT8QIbIk9y0NEtQwS4j?si=f67c5b259f3f45c7",
        youtube: "https://music.youtube.com/watch?v=xMV6l2y67rk&si=7oPk2CIZnvFaEAKZ",
        yandex: "https://music.yandex.ru/track/6679078?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track24.mp3",
      title: "The Falling Mysts",
      author: "Dimrain47",
      explicit: false,
      cover: "track24.jpg",
      links: {
        spotify: "https://open.spotify.com/track/6RzFdHz8KPuFGu2InU4JoL?si=e5636a27f9544071",
        youtube: "https://music.youtube.com/watch?v=jc1XkEq6MFA&si=VLyJbbfp4oJZB0aS"
      }
    },
    {
      file: "track25.mp3",
      title: "Children (Dream Version)",
      author: "Robert Miles",
      explicit: false,
      cover: "track25.jpg",
      links: {
        spotify: "https://open.spotify.com/track/7cEkyAXkwXCxTR3IKE0XHu?si=dc82d6552239470e",
        youtube: "https://music.youtube.com/watch?v=z9b09Ljnh0k&si=bko-th52mDk1XZp-",
        yandex: "https://music.yandex.ru/track/2409491?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track26.mp3",
      title: "Precipice",
      author: "Aaron Cherof",
      explicit: false,
      cover: "track26.jpg",
      links: {
        spotify: "https://open.spotify.com/track/2I3SfDBpiBZjAqYm547JF3?si=edb27f03b6564485",
        youtube: "https://music.youtube.com/watch?v=dEgjOyBwIaE&si=ieX-5OIXxijqfX1H",
        yandex: "https://music.yandex.ru/track/127914292?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track27.mp3",
      title: "Distortion",
      author: "LXST CXNTURY",
      explicit: true,
      cover: "track27.jpg",
      links: {
        spotify: "https://open.spotify.com/track/58leguITNtMvVHSuNJzERV?si=7dbd79db01b248ed",
        yandex: "https://music.yandex.ru/track/58723124?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track28.mp3",
      title: "Волна (Remastered)",
      author: "DJ SMASH",
      explicit: false,
      cover: "track28.jpg",
      links: {
        spotify: "https://open.spotify.com/track/4igevpRstq8oQaXB6rhpW1?si=223023b9146f4300",
        youtube: "https://music.youtube.com/watch?v=D2uZjE7JfPU&si=ZIpU3TTZBltjz9Z0",
        yandex: "https://music.yandex.ru/track/42125196?utm_source=web&utm_medium=copy_link"
      }
    },
    {
      file: "track29.mp3",
      title: "To the Infinity Castle",
      author: "Diego Mitre",
      explicit: false,
      cover: "track29.jpg",
      links: {
        spotify: "https://open.spotify.com/track/6vGFGjwN2UVK5dkgIBfjSL?si=b32afdaeb50d43ba",
        youtube: "https://music.youtube.com/watch?v=JgNTxDhGvsI&si=wY1b27CGaawrb5iR"
      }
    },
    {
      file: "track30.mp3",
      title: "Cheri Cheri Lady",
      author: "Modern Talking",
      explicit: false,
      cover: "track30.jpg",
      links: {
        spotify: "https://open.spotify.com/track/2aEuA8PSqLa17Y4hKPj5rr?si=4a0467ca52404def",
        youtube: "https://music.youtube.com/watch?v=c1ZCYY-4lAM&si=oiIN_kKp5lMiCRz9"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#2b6277, #000)' },
        bgCircle4: { background: '#681e01' },
        bgCircle3: { background: '#79a186' },
        bgCircle2: { background: '#2b6277' },
        bgCircle1: { background: '#bb7918' },
        bgCircle5: { border: '15px solid #8bb38e' },
        'player-textTitle': { color: '#8bb38e', textShadow: '0 0 15px #8bb38e' }
      }
    },
    {
      file: "track31.mp3",
      title: "YMCA - Original Version 1978",
      author: "Village People",
      explicit: false,
      cover: "track31.jpg",
      links: {
        spotify: "https://open.spotify.com/track/54OR1VDpfkBuOY5zZjhZAY?si=e893bcd90ced4b30",
        youtube: "https://music.youtube.com/watch?v=RN8Li7kYNnw&si=x6AfsiRsSGxjETk1",
        yandex: "https://music.yandex.ru/track/16070954?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#4b73ae, #000)' },
        bgCircle4: { background: '#4b73ae' },
        bgCircle3: { background: '#302f7f' },
        bgCircle2: { background: '#edd5a5' },
        bgCircle1: { background: '#947b3b' },
        bgCircle5: { border: '15px solid #925212' },
        'player-textTitle': { color: '#edd5a5', textShadow: '0 0 15px #edd5a5' }
      }
    },
    {
      file: "track32.mp3",
      title: "Brother Louie",
      author: "Modern Talking",
      explicit: false,
      cover: "track32.jpg",
      links: {
        spotify: "https://open.spotify.com/track/5zWZ9iNevP0397xB3jWV2z?si=d226b4c26a5c4795",
        youtube: "https://music.youtube.com/watch?v=b5EZp76Oxhw&si=9HzSjG0tjkmmVahU"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#395f84, #000)' },
        bgCircle4: { background: '#395f84' },
        bgCircle3: { background: '#af8851' },
        bgCircle2: { background: '#bda17a' },
        bgCircle1: { background: '#d1ccb6' },
        bgCircle5: { border: '15px solid #744b2d' },
        'player-textTitle': { color: '#d1ccb6', textShadow: '0 0 15px #d1ccb6' }
      }
    },
    {
      file: "track33.mp3",
      title: "Metal Crusher (Rmx v.2) Loop",
      author: "Djjaner",
      explicit: false,
      cover: "track33.png",
      colors: {
        backgroundGradient: { background: 'radial-gradient(#3f5088ff, #000)' },
        bgCircle4: { background: '#3f5088ff' },
        bgCircle3: { background: '#004ef5ff' },
        bgCircle2: { background: '#007ef3ff' },
        bgCircle1: { background: '#2900beff' },
        bgCircle5: { border: '15px solid #293c72ff' },
        'player-textTitle': { color: '#007ef3ff', textShadow: '0 0 15px #007ef3ff' }
      }
    },
    {
      file: "track34.mp3",
      title: "Faded",
      author: "Alan Walker",
      explicit: false,
      cover: "track34.jpg",
      links: {
        spotify: "https://open.spotify.com/track/7gHs73wELdeycvS48JfIos?si=c02f3e8e96ad41c5",
        youtube: "https://music.youtube.com/watch?v=pIWaVJPl0-c&si=SPJW_XnIOz-XjrUI"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#9dbdb8, #000)' },
        bgCircle4: { background: '#ffffff' },
        bgCircle3: { background: '#9fc2de' },
        bgCircle2: { background: '#0e4f65' },
        bgCircle1: { background: '#9dbdb8' },
        bgCircle5: { border: '15px solid #9dbdb8' },
        'player-textTitle': { color: '#ffffff', textShadow: '0 0 15px #ffffff' }
      }
    },
    {
      file: "track35.mp3",
      title: "Alone",
      author: "Alan Walker",
      explicit: false,
      cover: "track35.jpeg",
      links: {
        spotify: "https://open.spotify.com/track/0JiVRyTJcJnmlwCZ854K4p?si=53e7cac1baad4c86",
        youtube: "https://music.youtube.com/watch?v=aZwklvDdaVw&si=Rw7KlHVeHbjeIdUa"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#d9d9d9, #000)' },
        bgCircle4: { background: '#d9d9d9' },
        bgCircle3: { background: '#4a6367' },
        bgCircle2: { background: '#649093' },
        bgCircle1: { background: '#9b9b9b' },
        bgCircle5: { border: '15px solid #d9d9d9' },
        'player-textTitle': { color: '#d9d9d9', textShadow: '0 0 15px #d9d9d9' }
      }
    },
    {
      file: "track36.mp3",
      title: "Dreiton",
      author: "C418",
      explicit: false,
      cover: "track36.jpg",
      links: {
        spotify: "https://open.spotify.com/track/0lEikZP9JffOW4sufCKtQO?si=56422b241dbe4312",
        youtube: "https://music.youtube.com/watch?v=IJJo3AUF5e8&si=_TZTQQs57sYbgBrx"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#742d01, #000)' },
        bgCircle4: { background: '#c91a00' },
        bgCircle3: { background: '#f59100' },
        bgCircle2: { background: '#f38c00' },
        bgCircle1: { background: '#be4a00' },
        bgCircle5: { border: '15px solid #f16503' },
        'player-textTitle': { color: '#e7b100ff', textShadow: '0 0 15px #e7b100ff' }
      }
    },
    {
      file: "track37.mp3",
      title: "In My Mind",
      author: "Dynoro, Gigi D'Agostino",
      explicit: false,
      cover: "track37.jpg",
      links: {
        spotify: "https://open.spotify.com/track/0E9ZjEAyAwOXZ7wJC0PD33?si=bb00053ca2014885",
        youtube: "https://music.youtube.com/watch?v=74vpAa4AZ5c&si=SzUSEXWPYzg621YR",
        yandex: "https://music.yandex.ru/track/39257277?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#0c0c0c, #000)' },
        bgCircle4: { background: '#4e5277' },
        bgCircle3: { background: '#01fdc0' },
        bgCircle2: { background: '#f6f3ff' },
        bgCircle1: { background: '#4e5277' },
        bgCircle5: { border: '15px solid #f6f3ff' },
        'player-textTitle': { color: '#f6f3ff', textShadow: '0 0 15px #f6f3ff' }
      }
    },
    {
      file: "track38.mp3",
      title: "Arms Around You",
      author: "XXXTentacion, Lil Pump, Maluma, Swae Lee",
      explicit: true,
      cover: "track38.jpg",
      links: {
        spotify: "https://open.spotify.com/track/2LskIZrCeLxRvCiGP8gxlh?si=3c67a813ab8247b1",
        youtube: "https://music.youtube.com/watch?v=4LJJNt2Rkgw&si=A6ox5Fq1TBI-VV0t",
        yandex: "https://music.yandex.ru/track/44318163?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#e3ddc7, #000)' },
        bgCircle4: { background: '#8fae8c' },
        bgCircle3: { background: '#bdbfcb' },
        bgCircle2: { background: '#e6c496' },
        bgCircle1: { background: '#8fae8c' },
        bgCircle5: { border: '15px solid #364049' },
        'player-textTitle': { color: '#f6f3ff', textShadow: '0 0 15px #f6f3ff' }
      }
    },
    {
      file: "track39.mp3",
      title: "Die Young (Slowed)",
      author: "Lil Texas",
      explicit: false,
      cover: "track39.jpg",
      links: {
        spotify: "https://open.spotify.com/track/7AUpTOHTBAyg68d7pXorga?si=d4149394d2794bb3",
        youtube: "https://music.youtube.com/watch?v=i3jp5qxngRc&si=IBf5V2VILP0JNJRa",
        yandex: "https://music.yandex.ru/track/139994903?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#de4983, #000)' },
        bgCircle4: { background: '#dfbb0d' },
        bgCircle3: { background: '#dfbb0d' },
        bgCircle2: { background: '#de4983' },
        bgCircle1: { background: '#dfbb0d' },
        bgCircle5: { border: '15px solid #de4983' },
        'player-textTitle': { color: '#dfbb0d', textShadow: '0 0 15px #dfbb0d' }
      }
    },
    {
      file: "track40.mp3",
      title: "Wind Of Change",
      author: "Scorpions",
      explicit: false,
      cover: "track40.jpg",
      links: {
        spotify: "https://open.spotify.com/track/3ovjw5HZZv43SxTwApooCM?si=da7572d9b7164613",
        youtube: "https://music.youtube.com/watch?v=Ukh1zoiV304&si=pBlTlWaiEsyqQGLN",
        yandex: "https://music.yandex.ru/track/10216?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #bbbcc0, #000)' },
        bgCircle4: { background: '#bbbcc0' },
        bgCircle3: { background: '#5b6059' },
        bgCircle2: { background: '#6d7c77' },
        bgCircle1: { background: '#868885' },
        bgCircle5: { border: '15px solid #f1ecf2' },
        'player-textTitle': { color: '#f1eff0', textShadow: '0 0 15px #f1eff0' }
      }
    },
    {
      file: "track41.mp3",
      title: "The Winner Takes It All",
      author: "ABBA",
      explicit: false,
      cover: "track41.jpg",
      links: {
        spotify: "https://open.spotify.com/track/3oEkrIfXfSh9zGnE7eBzSV?si=cba0bca23d394a8e",
        youtube: "https://music.youtube.com/watch?v=WbnG3eAGb6Y&si=ko8dg5U0GmPLtz-t",
        yandex: "https://music.yandex.ru/track/25788?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient(#070d0b, #000)' },
        bgCircle4: { background: '#eeb91b' },
        bgCircle3: { background: '#721818' },
        bgCircle2: { background: '#b0762c' },
        bgCircle1: { background: '#9a1b24' },
        bgCircle5: { border: '15px solid #e1b56a' },
        'player-textTitle': { color: '#e1b56a', textShadow: '0 0 15px #e1b56a' }
      }
    },
    {
      file: "track42.mp3",
      title: "Life Distortion",
      author: "Crxz",
      explicit: false,
      cover: "track42.jpg",
      links: {
        spotify: "https://open.spotify.com/track/7Lh40SPkPGBo77ADsMxaJ4?si=0a93f45e43994888",
        yandex: "https://music.yandex.ru/track/117435291?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #000b29ff, #000 )' },
        bgCircle4: { background: '#003e71' },
        bgCircle3: { background: '#05050f' },
        bgCircle2: { background: '#002949' },
        bgCircle1: { background: '#03030b' },
        bgCircle5: { border: '15px solid #014075' },
        'player-textTitle': { color: '#014075', textShadow: '0 0 15px #014075' }
      }
    },
    {
      file: "track43.mp3",
      title: "Nock Em",
      author: "Bossfight",
      explicit: false,
      cover: "track43.jpg",
      links: {
        spotify: "https://open.spotify.com/track/2rl0WAMR1CMtn0svwCXOwK?si=7f41c4e3de9b430c",
        youtube: "https://music.youtube.com/watch?v=J077DryC2os&si=uy2EWG3awByO0sUc"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #c7959f, #000 )' },
        bgCircle4: { background: '#f54384' },
        bgCircle3: { background: '#d3b4fe' },
        bgCircle2: { background: '#b0fb24' },
        bgCircle1: { background: '#5899f1' },
        bgCircle5: { border: '15px solid #fc2474' },
        'player-textTitle': { color: '#b4fd1f', textShadow: '0 0 15px #b4fd1f' }
      }
    },
    {
      file: "track44.mp3",
      title: "Milky Ways",
      author: "Bossfight",
      explicit: false,
      cover: "track44.jpg",
      links: {
        spotify: "https://open.spotify.com/track/4Lh9y6lykMrLL3MBhx0CeO?si=f8f093b8cf7b43b9",
        youtube: "https://music.youtube.com/watch?v=_5w8SJ3yVsc&si=Q7eZCyhg5GcWOt03"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #bababa, #000 )' },
        bgCircle4: { background: '#ff0202' },
        bgCircle3: { background: '#ffffff' },
        bgCircle2: { background: '#fe0000' },
        bgCircle1: { background: '#454f82' },
        bgCircle5: { border: '15px solid #9b02d9' },
        'player-textTitle': { color: '#ffffff', textShadow: '0 0 15px #ffffff' }
      }
    },
    {
      file: "track45.mp3",
      title: "BLUE",
      author: "Billie Eilish",
      explicit: false,
      cover: "track45.jpg",
      links: {
        spotify: "https://open.spotify.com/track/2prqm9sPLj10B4Wg0wE5x9?si=0a7827f27937466d",
        yandex: "https://music.yandex.ru/track/126087913?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #112c41, #000 )' },
        bgCircle4: { background: '#0b3857' },
        bgCircle3: { background: '#0a131c' },
        bgCircle2: { background: '#253944' },
        bgCircle1: { background: '#080d11' },
        bgCircle5: { border: '15px solid #979b8c' },
        'player-textTitle': { color: '#979b8c', textShadow: '0 0 15px #979b8c' }
      }
    },
    {
      file: "track46.mp3",
      title: "bellyache",
      author: "Billie Eilish",
      explicit: false,
      cover: "track46.jpg",
      links: {
        spotify: "https://open.spotify.com/track/1ni8ZTAY1GHXEFOGHl7fdg?si=38d196ac753b4a05",
        youtube: "https://music.youtube.com/watch?v=Vg18eeEugOQ&si=YzN4s3Wzz6908tdp",
        yandex: "https://music.yandex.ru/track/33894103?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #edd978, #eacf66 )' },
        bgCircle4: { background: '#f3e6a0' },
        bgCircle3: { background: '#eacf66' },
        bgCircle2: { background: '#7d0003' },
        bgCircle1: { background: '#e42137' },
        bgCircle5: { border: '15px solid #c43139' },
        'player-textTitle': { color: '#c43139', textShadow: '0 0 15px #c43139' }
      }
    },
    {
      file: "track47.mp3",
      title: "Blinding Lights",
      author: "The Weeknd",
      explicit: false,
      cover: "track47.jpg",
      links: {
        spotify: "https://open.spotify.com/track/0VjIjW4GlUZAMYd2vXMi3b?si=9486e58adbf64fd5",
        youtube: "https://music.youtube.com/watch?v=J7p4bzqLvCw&si=c5FyQzXK0_YJievs",
        yandex: "https://music.yandex.ru/track/60292250?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #02070a, #000 )' },
        bgCircle4: { background: '#83a290' },
        bgCircle3: { background: '#31402b' },
        bgCircle2: { background: '#83a290' },
        bgCircle1: { background: '#080d11' },
        bgCircle5: { border: '15px solid #860519' },
        'player-textTitle': { color: '#aec6b8', textShadow: '0 0 15px #aec6b8' }
      }
    },
    {
      file: "track48.mp3",
      title: "Save Me",
      author: "The Parakit, Alden Jacob",
      explicit: false,
      cover: "track48.jpg",
      links: {
        spotify: "https://open.spotify.com/track/2aW5z2LFsJwWl7gAPQCap8?si=389d21f7c3eb483b",
        youtube: "https://music.youtube.com/watch?v=mn2dgMjEyPU&si=IFqRi5W-kVL8LFQ9",
        yandex: "https://music.yandex.ru/track/27254433?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #ffffff, #000 )' },
        bgCircle4: { background: '#00aa85ff' },
        bgCircle3: { background: '#ffffff' },
        bgCircle2: { background: '#00a17eff' },
        bgCircle1: { background: '#ffffff' },
        bgCircle5: { border: '15px solid #009272ff' },
        'player-textTitle': { color: '#fff', textShadow: '0 0 15px #fff' }
      }
    },
    {
      file: "track49.mp3",
      title: "Ghost Town",
      author: "Adam Lambert",
      explicit: true,
      cover: "track49.jpg",
      links: {
        spotify: "https://open.spotify.com/track/44aN5xKL3kGHvQ5bXVk6B8?si=190e2f2c7e104da4",
        youtube: "https://music.youtube.com/watch?v=lDoXekDxHIU&si=3MjUpcLnHaUFpINd",
        yandex: "https://music.yandex.ru/track/23466120?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #7b7b7b, #000 )' },
        bgCircle4: { background: '#d6d6d6' },
        bgCircle3: { background: '#7b7b7b' },
        bgCircle2: { background: '#d9d9d9' },
        bgCircle1: { background: '#9e9e9e' },
        bgCircle5: { border: '15px solid #f0f0f0' },
        'player-textTitle': { color: '#f0f0f0', textShadow: '0 0 15px #f0f0f0' }
      }
    },
    {
      file: "track50.mp3",
      title: "Let Me Love You",
      author: "DJ Snake, Justin Bieber",
      explicit: false,
      cover: "track50.jpg",
      links: {
        spotify: "https://open.spotify.com/track/0lYBSQXN6rCTvUZvg9S0lU?si=e65e9d1160ab4f24",
        youtube: "https://music.youtube.com/watch?v=rJ0D1GbDq1Q&si=XsmhjDEXMMZ0IYO1",
        yandex: "https://music.yandex.ru/track/66933249?utm_source=web&utm_medium=copy_link"
      },
      colors: {
        backgroundGradient: { background: 'radial-gradient( #c9a66e, #000 )' },
        bgCircle4: { background: '#c1dee6' },
        bgCircle3: { background: '#cca369' },
        bgCircle2: { background: '#f7fbfc' },
        bgCircle1: { background: '#725124' },
        bgCircle5: { border: '15px solid #e5c07c' },
        'player-textTitle': { color: '#e5c07c', textShadow: '0 0 15px #e5c07c' }
      }
    }
];

// const playlists = [
//     { id: 'All', name: 'ShampurRadio', img: 'assets/icons/all.png', color: '#ff9900' },
//     { id: 'Liked', name: 'Понравилось', img: 'assets/icons/liked.png', color: '#ff605e' }
//     // Можно добавить другие, если будут
// ];

// ===== CONFIG =====
const audioFolder = './assets/audio/';
let currentTrackIndex = 0;
let currentPlaylist = "radio"; // "radio" или "liked"
let likedTracks = JSON.parse(localStorage.getItem('likedTracks')) || [];
let playerSettings = {
  skipExplicit: JSON.parse(localStorage.getItem('skipExplicit')) || false,
  vibeMode: localStorage.getItem('vibeMode') !== null ? JSON.parse(localStorage.getItem('vibeMode')) : false
};
let repeatTrack = false; // изначально выключен

// ===== DOM =====
const settingsButton = document.getElementById("settingsButton");
const settingsModalOverlay = document.querySelector(".settings-modal-overlay");
const settingsCloseButton = document.querySelector(".settings-modal-close");
const skipExplicitCheckbox = document.getElementById('skipExplicitCheckbox');
const vibeModeCheckbox = document.getElementById('vibeModeCheckbox');
let styleElements = [];
const originalStyles = new Map();

const audioElement     = document.getElementById('audio');
const prevTrackButton  = document.getElementById('prevTrack');
const playPauseBtn     = document.getElementById('playPause');
const nextTrackButton  = document.getElementById('nextTrack');
const volumeInput      = document.getElementById('volume');
const currentTimeSpan  = document.getElementById('currentTime');
const durationSpan     = document.getElementById('duration');
const trackTitleSpan   = document.getElementById('trackTitle');
const trackAuthorSpan  = document.getElementById('trackAuthor');
const playPauseIcon    = document.getElementById('playPauseIcon');
const trackIDSpan      = document.getElementById('trackID');
const trackCover       = document.getElementById('trackCover');
const likeButton       = document.getElementById('likeButton');
const repeatTrackBtn = document.getElementById('repeatTrackBtn');

const modalOverlay     = document.getElementById('musicModalOverlay');
const modalClose       = document.getElementById('musicModalClose');
const modalTrackCover  = document.getElementById('modalTrackCover');
const modalTitle       = document.getElementById('musicModalTitle');
const modalAuthor      = document.getElementById('musicModalAuthor');
const modalLinks       = document.getElementById('musicModalLinks');

// const playlistNameBtn = document.getElementById('playlistName');
// const playlistModal = document.getElementById('playlistModal');
// const playlistModalOverlay = document.getElementById('playlistModalOverlay');
// const playlistModalClose = document.getElementById('playlistModalClose');
// const playlistList = document.getElementById('playlistList');

const explicitWarningOverlay = document.getElementById('explicitWarningOverlay');
const explicitListenFromStartBtn = document.getElementById('explicitListenFromStart');
const explicitListenAnywayBtn = document.getElementById('explicitListenAnyway');

const likeNotification = document.getElementById('likeNotification');
const copyNotification = document.getElementById('copyNotification');

// ===== UTILS =====
function saveSettings(){
  localStorage.setItem('skipExplicit', JSON.stringify(playerSettings.skipExplicit));
  localStorage.setItem('vibeMode', JSON.stringify(playerSettings.vibeMode));
  localStorage.setItem('likedTracks', JSON.stringify(likedTracks));
}

function showNotification(element, text){
  if(!element) return;
  element.textContent = text;
  element.classList.add('show');
  setTimeout(()=>element.classList.remove('show'),2000);
}

function isLiked(index){ return likedTracks.includes(index); }

function getCurrentTrack(){
  // if(currentPlaylist==='Liked'){
  //   const idx = likedTracks[currentTrackIndex];
  //   return tracks[idx] || tracks[0];
  // }
  return tracks[currentTrackIndex];
}

function updateLikeButton(){
  // const img = likeButton.querySelector('img');
  // if(isLiked(currentPlaylist==='Liked'?likedTracks[currentTrackIndex]:currentTrackIndex)){
  //   img.src='assets/icons/heart-minus.svg';
  // } else {
  //   img.src='assets/icons/heart.svg';
  // }
  const img = likeButton.querySelector('img');
  if(isLiked(currentTrackIndex)){
    img.src = 'assets/icons/heart-minus.svg';
    likeButton.setAttribute('style', 'background-color: rgba(255, 0, 0, 0.397);');
  } else {
    img.src = 'assets/icons/heart.svg';
    likeButton.setAttribute('style', 'background-color: rgba(255, 255, 255, 0.05);');
  }
}

function updateTrackInfo(){
  const track = getCurrentTrack();
  trackTitleSpan.textContent = track.title;
  trackAuthorSpan.textContent = track.author || '';
  trackIDSpan.textContent = currentTrackIndex;
  trackCover.src = track.cover ? `assets/covers/${track.cover}` : 'assets/covers/unknown-track.png';

   document.title = track.title + (track.author ? ` • ${track.author}` : '');

  // explicit badge
  const existingBadge = trackTitleSpan.querySelector('.explicit-badge');
  if(track.explicit && !existingBadge){
    const badge = document.createElement('img');
    badge.className='explicit-badge';
    badge.src='assets/icons/explicit.png';
    badge.style.width='20px';
    badge.style.height='20px';
    badge.style.marginLeft='8px';
    badge.style.verticalAlign='middle';
    trackTitleSpan.appendChild(badge);
  } else if(!track.explicit && existingBadge) {
    existingBadge.remove();
  }

  updateLikeButton();
}

// ===== LIKE BUTTON =====
likeButton.addEventListener('click',()=>{
  // const trackID = currentPlaylist==='Liked'?likedTracks[currentTrackIndex]:currentTrackIndex;
  // if(isLiked(trackID)){
  //   likedTracks = likedTracks.filter(x=>x!==trackID);
  //   showNotification(likeNotification,'Трек удалён из понравившихся!');
  // } else {
  //   likedTracks.push(trackID);
  //   showNotification(likeNotification,'Трек добавлен в понравившиеся!');
  // }
  // saveSettings();
  // updateLikeButton();
  const trackID = currentTrackIndex;
  if (isLiked(trackID)) {
    likedTracks = likedTracks.filter(x => x !== trackID);
    showNotification(likeNotification,'Трек больше не лайкнут');
  } else {
    likedTracks.push(trackID);
    showNotification(likeNotification,'Вы лайкнули трек');
  }
  saveSettings();
  updateLikeButton();
});

repeatTrackBtn.addEventListener('click', () => {
  repeatTrack = !repeatTrack;
  repeatTrackBtn.classList.toggle('active', repeatTrack);

  showNotification(copyNotification, repeatTrack ? 'Повтор трека включен' : 'Повтор трека выключен');
});

// ===== MODAL TRACK =====
function openModal(){
  const track=getCurrentTrack();
  modalTrackCover.src = track.cover?`assets/covers/${track.cover}`:'assets/covers/unknown-track.png';
  modalTitle.textContent = track.title;
  modalAuthor.textContent = track.author || '';
  modalLinks.innerHTML='';
  if(track.links){
    for(const [service,url] of Object.entries(track.links)){
      const btn=document.createElement('a');
      btn.href=url;
      btn.target="_blank";
      btn.className=`music-modal-button ${service}`;
      const img=document.createElement('img');
      img.src=`assets/icons/${service}.png`;
      img.alt=service;
      btn.appendChild(img);
      const span=document.createElement('span');
      span.textContent=service.charAt(0).toUpperCase()+service.slice(1);
      btn.appendChild(span);
      modalLinks.appendChild(btn);
    }
  } else {
    modalLinks.textContent='У этого трека нет ссылок на сервисы';
  }
  modalOverlay.style.display='flex';
  modalOverlay.offsetHeight;
  requestAnimationFrame(()=>modalOverlay.classList.add('active'));
}

function closeModal(){
  modalOverlay.classList.remove('active');
  modalOverlay.addEventListener('transitionend',()=>{modalOverlay.style.display='none';},{once:true});
}

trackTitleSpan.addEventListener('click',openModal);
modalClose.addEventListener('click',closeModal);
modalOverlay.addEventListener('click', e=>{if(e.target===modalOverlay) closeModal();});

// ===== SETTINGS MODAL =====
function openSettingsModal(){
  settingsModalOverlay.style.display='flex';
  settingsModalOverlay.offsetHeight; // reflow
  requestAnimationFrame(()=>settingsModalOverlay.classList.add('active'));
}

function closeSettingsModal(){
  settingsModalOverlay.classList.remove('active');
  settingsModalOverlay.addEventListener('transitionend',function handler(){
    settingsModalOverlay.style.display='none';
    settingsModalOverlay.removeEventListener('transitionend', handler);
  });
}

settingsButton.addEventListener('click',openSettingsModal);
settingsCloseButton.addEventListener('click',closeSettingsModal);
settingsModalOverlay.addEventListener('click',e=>{if(e.target===settingsModalOverlay) closeSettingsModal();});

// ===== PLAYLIST MODAL =====
// playlistNameBtn.addEventListener('click', () => {
//   renderPlaylistModal();
//   playlistModalOverlay.style.display = 'flex';
//   requestAnimationFrame(() => playlistModalOverlay.classList.add('active'));
// });

// function closePlaylistModal() {
//   playlistModalOverlay.classList.remove('active');
//   playlistModalOverlay.addEventListener('transitionend', function handler() {
//     playlistModalOverlay.style.display = 'none';
//     playlistModalOverlay.removeEventListener('transitionend', handler);
//   }, { once: true });
// }

// playlistModalClose.addEventListener('click', () => {
//   playlistModalOverlay.classList.remove('active');
//   playlistModalOverlay.addEventListener('transitionend', () => {
//     playlistModalOverlay.style.display = 'none';
//   }, { once: true });
// });

// playlistModalOverlay.addEventListener('click', e => {
//   if (e.target === playlistModalOverlay) {
//     playlistModalOverlay.classList.remove('active');
//     playlistModalOverlay.addEventListener('transitionend', () => {
//       playlistModalOverlay.style.display = 'none';
//     }, { once: true });
//   }
// });

function renderPlaylistModal() {
  if (typeof playlistList === 'undefined' || !playlistList) return;
  playlistList.innerHTML = '';
  (playlists || []).forEach(pl => {
    const item = document.createElement('div');
    item.className = 'playlist-item';
    item.innerHTML = `
      <img src="${pl.img}" alt="${pl.name}">
      <span>${pl.name}</span>
    `;
    item.addEventListener('click', () => {
      currentPlaylist = pl.id;
      currentTrackIndex = 0;
      loadTrack(true);
      if (typeof playlistNameBtn !== 'undefined' && playlistNameBtn) {
        playlistNameBtn.textContent = pl.name + " ▼";
      }
      if (typeof playlistModalOverlay !== 'undefined' && playlistModalOverlay) {
        playlistModalOverlay.classList.remove('active');
        playlistModalOverlay.addEventListener('transitionend', () => {
          playlistModalOverlay.style.display = 'none';
        }, { once: true });
      }
    });
    playlistList.appendChild(item);
  });
}

// ===== COPY LINK =====
trackIDSpan.addEventListener('click',()=>{
  const link=`${window.location.origin}${window.location.pathname}?track=${currentTrackIndex}`;
  navigator.clipboard.writeText(link)
    .then(()=>showNotification(copyNotification,`Ссылка на трек #${currentTrackIndex} скопирована!`));
});

// ===== CORE =====
function loadTrack(autoPlay = false) {
  let track = getCurrentTrack();

  // Скип Explicit (если включён)
  if (playerSettings.skipExplicit && track.explicit) {
    let tries = 0;
    do {
      currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
      track = getCurrentTrack();
      tries++;
      if (tries > tracks.length) {
        console.warn("Все треки explicit, воспроизведение остановлено");
        audioElement.pause();
        return;
      }
    } while (track.explicit);
  }

  const newSrc = audioFolder + track.file;
  const resolved = new URL(newSrc, window.location.href).href;
  if (audioElement.src !== resolved) {
    audioElement.src = newSrc;
  }

  updateTrackInfo();

  // **обновляем Media Session**
  updateMediaSession(track);

  if(autoPlay){
    audioElement.play().catch(console.error);
  }

  // applyVibeStyles?.();
  applyTrackColors(track);
}


// ===== TIMERS =====
audioElement.addEventListener('timeupdate', () => {
  if (!audioElement.duration) return;

  // обновляем текст времени
  const c = audioElement.currentTime, d = audioElement.duration;
  const mc = Math.floor(c / 60), sc = Math.floor(c % 60);
  currentTimeSpan.textContent = `${mc<10?'0':''}${mc}:${sc<10?'0':''}${sc}`;

  if (d) {
    const md = Math.floor(d / 60), sd = Math.floor(d % 60);
    durationSpan.textContent = `${md<10?'0':''}${md}:${sd<10?'0':''}${sd}`;
  }

  // обновляем прогресс бар + слайдер
  updateProgress();
});

// === перемотка по слайдеру ===
seekSlider.addEventListener('input', () => {
  if (audioElement.duration) {
    const seekTime = (seekSlider.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
  }
});

function resetProgress() {
  seekSlider.value = 0;
  const progressBar = document.getElementById('progressBar');
  if (progressBar) progressBar.style.width = '0%';
}

function updateProgress() {
  if (!audioElement.duration) return;
  
  const progressPercent = (audioElement.currentTime / audioElement.duration) * 100;
  
  // обновляем слайдер
  seekSlider.value = progressPercent;

  // обновляем кастомный прогресс-бар (если у тебя есть)
  const progressBar = document.getElementById('progressBar');
  if (progressBar) {
    progressBar.style.width = `${progressPercent}%`;
  }
}


audioElement.addEventListener('ended', () => {
  if (repeatTrack) {
    audioElement.currentTime = 0;
    audioElement.play();
  } else {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    loadTrack(true);
  }
});

audioElement.addEventListener('play', () => {
  playPauseIcon.src = 'assets/player/pause.svg';
  initVisualizer();
});

audioElement.addEventListener('pause',()=>playPauseIcon.src='assets/player/play_arrow.svg');

// ===== CONTROLS =====
playPauseBtn.addEventListener('click',()=>{
  if(audioElement.paused) audioElement.play().catch(console.error);
  else audioElement.pause();
});

// nextTrackButton.addEventListener('click', () => {
//   currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
//   loadTrack(true, 1);
// });

// prevTrackButton.addEventListener('click', () => {
//   if (audioElement.currentTime > 5 && !audioElement.paused) {
//     audioElement.currentTime = 0;
//     updateTrackInfo();
//   } else {
//     currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
//     loadTrack(true, -1);
//   }
// });
nextTrackButton.addEventListener('click', () => {
    do {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    } while (playerSettings.skipExplicit && tracks[currentTrackIndex].explicit);
    loadTrack(true);
    resetProgress();
});

prevTrackButton.addEventListener('click', () => {
    if (audioElement.currentTime > 5 && !audioElement.paused) {
        audioElement.currentTime = 0;
        updateTrackInfo();
    } else {
        do {
            currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
        } while (playerSettings.skipExplicit && tracks[currentTrackIndex].explicit);
        loadTrack(true);
    }
    resetProgress();
});

volumeInput.addEventListener('input',()=>{audioElement.volume=volumeInput.value;});

// ===== AUDIO VISUALIZER (реально только бас) =====
let audioCtx, analyser, source, filter, dataArray;

function initVisualizer() {
  if (audioCtx) return; // уже инициализировано

  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  source = audioCtx.createMediaElementSource(audioElement);

  // фильтр для анализа
  filter = audioCtx.createBiquadFilter();
  filter.type = "lowpass";
  filter.frequency.value = 50;

  analyser = audioCtx.createAnalyser();
  analyser.fftSize = 256;
  dataArray = new Uint8Array(analyser.frequencyBinCount);

  // звук в колонки
  source.connect(audioCtx.destination);

  // фильтр → анализатор (только для визуализации)
  source.connect(filter);
  filter.connect(analyser);

  animateCover();      // твоя анимация обложки
  animateBgCircles();  // новая анимация кругов фона
}

function animateCover() {
  requestAnimationFrame(animateCover);

  if (!analyser) return;
  analyser.getByteFrequencyData(dataArray);

  // берём только низкие частоты (бас)
  const bassBins = 5; // можно подбирать
  let sum = 0;
  for (let i = 0; i < bassBins; i++) {
    sum += dataArray[i];
  }
  const bass = sum / bassBins; // средний уровень баса 0-255

  const amplified = bass * 2; 
  const scale = 1 + (amplified / 256) * 0.1;

  if (trackCover) {
    trackCover.style.transform = `scale(${scale})`;
  }

  // если хочешь фон тоже под бас
  // bgCircles.forEach(circle => {
  //   const brightnessFactor = 0.3 + (bass / 255) * 8.7;
  //   circle.style.filter = `brightness(${brightnessFactor})`;
  // });
}


function updateMediaSession(track) {
  if ('mediaSession' in navigator) {
    navigator.mediaSession.metadata = new MediaMetadata({
      title: track.title,
      artist: track.author || 'Unknown',
      album: 'ShampurRadio',
      artwork: [
        { src: track.cover ? `assets/covers/${track.cover}` : 'assets/covers/unknown-track.png', sizes: '512x512', type: 'image/png' }
      ]
    });

    navigator.mediaSession.setActionHandler('play', () => audioElement.play());
    navigator.mediaSession.setActionHandler('pause', () => audioElement.pause());
    navigator.mediaSession.setActionHandler('previoustrack', () => prevTrackButton.click());
    navigator.mediaSession.setActionHandler('nexttrack', () => nextTrackButton.click());

    // Ползунок перемотки
    navigator.mediaSession.setActionHandler('seekto', (details) => {
      if (details.fastSeek && 'fastSeek' in audioElement) {
        audioElement.fastSeek(details.seekTime);
        return;
      }
      audioElement.currentTime = details.seekTime;
    });
  }
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
      const allClasses = [
        'backgroundGradient',
        'bgCircle4',
        'bgCircle3',
        'bgCircle2',
        'bgCircle1',
        'bgCircle5',
        'player-textTitle'
    ];

        styleElements = allClasses.flatMap(className => {
        return Array.from(document.getElementsByClassName(className));
    });

        styleElements.forEach(element => {
        const computed = getComputedStyle(element);
        const vibeModeCheckbox = document.getElementById('vibeModeCheckbox');
        const watchedProps = ['background', 'color', 'border', 'textShadow'];
        const original = {};
        watchedProps.forEach(prop => {
            original[prop] = computed[prop];
        });
        originalStyles.set(element, original);

        if (vibeModeCheckbox) {
        // Устанавливаем состояние по сохранённой настройке
        vibeModeCheckbox.checked = playerSettings.vibeMode;

        vibeModeCheckbox.addEventListener('change', (e) => {
            playerSettings.vibeMode = !!e.target.checked;
            saveSettings();

            // Применяем/сбрасываем стили для текущего трека сразу
            applyTrackColors(getCurrentTrack());
        });
    }
    
        // Анимация плавного перехода
        element.style.transition = "all 2.8s cubic-bezier(0.4, 0, 0.2, 1)";
    });

  // Welcome modal (если есть в верстке)
  const welcomeModalOverlay = document.getElementById('welcomeModalOverlay');
  const continueBtn = document.getElementById('continueBtn');
  const dontShowCheckbox = document.getElementById('dontShowCheckbox');
  const isMobile = /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

    if (isMobile) {
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.background = "rgba(0, 0, 0, 0.95)";
    overlay.style.color = "#fff";
    overlay.style.display = "flex";
    overlay.style.flexDirection = "column";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.fontFamily = "Arial, sans-serif";
    overlay.style.zIndex = "999999";

    overlay.innerHTML = `
      <h2 style="font-size: 22px; margin-bottom: 16px; text-align: center; color: #ff9900; text-shadow: 0 0 15px #ff7300;">
        Вы с мобильного устройства?
      </h2>
      <p style="max-width: 90%; text-align: center; font-size: 16px; line-height: 1.5; color: #696969;">
        ShampurRadio пока не получится использовать с мобильного устройства.<br>
        Если вы хотите всё равно продолжить - включите режим ПК в настройках вашего браузера
      </p>
    `;

    document.body.appendChild(overlay);
  }

  if (welcomeModalOverlay && localStorage.getItem('hideWelcomeModal') !== 'true') {
    welcomeModalOverlay.style.display = 'flex';
    requestAnimationFrame(() => {
      welcomeModalOverlay.classList.add('active');
    });
    if (continueBtn) {
      continueBtn.addEventListener('click', () => {
        if (dontShowCheckbox && dontShowCheckbox.checked) {
          localStorage.setItem('hideWelcomeModal', 'true');
        }
        welcomeModalOverlay.classList.remove('active');
        welcomeModalOverlay.addEventListener('transitionend', () => {
          welcomeModalOverlay.style.display = 'none';
        }, { once: true });
      });
    }
  }

  const seekSlider = document.getElementById('seekSlider');

  // Чтение трека из URL или случайный
  const fromURL = parseInt(new URLSearchParams(window.location.search).get('track'));
  currentTrackIndex = (fromURL >= 0 && fromURL < tracks.length)
    ? fromURL
    : Math.floor(Math.random() * tracks.length);

  const track = getCurrentTrack();

  // Если включён skipExplicit — просто грузим, логика скипа сработает внутри loadTrack
  if (playerSettings.skipExplicit) {
    loadTrack(true);
  } else {
    // skipExplicit выключен — если трек explicit и пришёл из URL, показываем предупреждение
    if (track.explicit && fromURL >= 0 && fromURL < tracks.length && explicitWarningOverlay) {
      explicitWarningOverlay.style.display = 'flex';

      if (explicitListenFromStartBtn) {
        explicitListenFromStartBtn.onclick = () => {
          currentTrackIndex = findFirstNonExplicitTrackIndex();
          explicitWarningOverlay.style.display = 'none';
          loadTrack(true);
        };
      }

      if (explicitListenAnywayBtn) {
        explicitListenAnywayBtn.onclick = () => {
          explicitWarningOverlay.style.display = 'none';
          loadTrack(true);
        };
      }

      return; // ждём выбор пользователя
    } else {
      loadTrack(true);
    }
  }

  // Инициализация чекбоксов
  if (skipExplicitCheckbox) {
    skipExplicitCheckbox.checked = playerSettings.skipExplicit;
    skipExplicitCheckbox.addEventListener('change', (e)=>{
      playerSettings.skipExplicit = !!e.target.checked;
      saveSettings();
      // Если включили скип и текущий трек explicit — перескочим немедленно
      if (playerSettings.skipExplicit && getCurrentTrack().explicit) {
        loadTrack(!audioElement.paused);
      }
    });
  }

  if (vibeModeCheckbox) {
    vibeModeCheckbox.checked = playerSettings.vibeMode;
    vibeModeCheckbox.addEventListener('change', (e)=>{
      playerSettings.vibeMode = !!e.target.checked;
      saveSettings();
      applyVibeStyles?.();
    });
  }
});

// ============= Помощник для поиска первого не explicit трека ===========
function findFirstNonExplicitTrackIndex() {
  for(let i=0; i<tracks.length; i++){
    if(!tracks[i].explicit) return i;
  }
  return 0; // если все explicit — просто 0
}

function getNextTrackIndex(forward = true) {
    let newIndex = currentTrackIndex;
    let tries = 0;

    do {
        newIndex = forward
            ? (newIndex + 1) % tracks.length
            : (newIndex - 1 + tracks.length) % tracks.length;
        tries++;
        if (tries > tracks.length) return currentTrackIndex; // все explicit
    } while (playerSettings.skipExplicit && tracks[newIndex].explicit);

    return newIndex;
}

const openTracklistBtn = document.getElementById('openTracklistBtn');
const tracklistModal = document.getElementById('tracklistModal');
const tracklistClose = document.getElementById('tracklistModalClose');
const tracklistContainer = document.getElementById('tracklistContainer');

// Play по кнопке на обложке
tracks.forEach((track, index) => {
  const item = document.createElement('div');
  item.className = 'tracklist-item';
  
item.innerHTML = `
  <div class="tracklist-cover-wrapper">
    <img src="assets/covers/${track.cover || 'unknown-track.png'}" alt="${track.title}" class="tracklist-cover">
    <div class="tracklist-play-btn-overlay">▶</div>
  </div>
  <div class="tracklist-info">
    <span class="tracklist-title">${track.title}</span>
    <span class="tracklist-author">${track.author || ''}</span>
  </div>
  <div class="tracklist-buttons">
    <button class="tracklist-like-btn">❤</button>
    <button class="tracklist-share-btn">🔗</button>
  </div>
`;

item.querySelector('.tracklist-like-btn').addEventListener('click', e => {
  e.stopPropagation();
  if(likedTracks.includes(index)) likedTracks = likedTracks.filter(x => x !== index);
  else likedTracks.push(index);
  saveSettings();
  showNotification(likeNotification, likedTracks.includes(index) ? 'Вы лайкнули трек' : 'Трек больше не лайкнут');
});

item.querySelector('.tracklist-share-btn').addEventListener('click', e => {
  e.stopPropagation();
  const link = `${window.location.origin}${window.location.pathname}?track=${index}`;
  navigator.clipboard.writeText(link).then(() => showNotification(copyNotification, `Ссылка на трек #${index} скопирована!`));
});

const playBtn = item.querySelector('.tracklist-play-btn-overlay');
playBtn.addEventListener('click', (e) => { // <- e здесь
    e.stopPropagation();                     // предотвращаем всплытие
    currentTrackIndex = index;               // ставим трек
    loadTrack(true);                          // начинаем воспроизведение
    closeTracklistModal();                    // закрываем модалку
});

  tracklistContainer.appendChild(item);
});

function closeTracklistModal() {
  tracklistModal.classList.remove('active');
  tracklistModal.style.display = 'none'; // <- принудительно скрываем
}

openTracklistBtn.addEventListener('click', () => {
  tracklistModal.style.display = 'flex';
  requestAnimationFrame(() => tracklistModal.classList.add('active'));
});

tracklistClose.addEventListener('click', () => {
  closeTracklistModal();
});

tracklistModal.addEventListener('click', e => {
  if (e.target === tracklistModal) closeTracklistModal();
});

// Окрашивание сайта через colors
function applyTrackColors(track) {
    if (!playerSettings.vibeMode) {
        // Vibe Mode выключен — сбрасываем стили на оригинальные
        resetStyles();
        return;
    }
    
    if (track.colors) {
        // Применяем кастомные стили для текущего трека
        for (const className in track.colors) {
            const props = track.colors[className];
            const elements = document.getElementsByClassName(className);
            Array.from(elements).forEach(element => {
                for (const prop in props) {
                    element.style[prop] = props[prop];
                }
            });
        }
    } else {
        // Если цветов нет — сбрасываем на оригинальные
        resetStyles();
    }
}

function resetStyles() {
    styleElements.forEach(element => {
        const original = originalStyles.get(element);
        if (original) {
            for (const prop in original) {
                element.style[prop] = original[prop];
            }
        }
    });
}






// const bgCircles = document.querySelectorAll('.bgCircle');
// let bgCircleAngles = Array.from(bgCircles).map(() => Math.random() * Math.PI * 2);

// function animateBackground() {
//   requestAnimationFrame(animateBackground);

//   if (!analyser) return;
//   analyser.getByteFrequencyData(dataArray);

//   // берём бас
//   const bassBins = 1;
//   let sum = 0;
//   for (let i = 0; i < bassBins; i++) sum += dataArray[i];
//   const bass = sum / bassBins; // 0-255

//   bgCircles.forEach((circle, i) => {
//     // скорость движения зависит от баса
//     const speed = 0.001 + (bass / 255) * 5.02;
//     bgCircleAngles[i] += speed;

//     const radius = 50 + i*10; // радиус движения
//     const x = 50 + Math.cos(bgCircleAngles[i]) * radius; 
//     const y = 50 + Math.sin(bgCircleAngles[i]) * radius;

//     circle.style.left = `${x}%`;
//     circle.style.top = `${y}%`;

//     // светлеем под бас
//     const brightness = 0.5 + (bass / 255) * 0.5;
//     circle.style.filter = `brightness(${brightness})`;
//   });
// }