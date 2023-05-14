## Türkiye Seçim 2023 API

- NodeJS kullanılarak yazılmıştır.
- Veriler [NTV](https://secim.ntv.com.tr/) sitesinden ve [CNNTurk](https://www.cnnturk.com/) sitesinden çekilmektedir.
- Veriler otomatik olarak güncellenmektedir.


## Kurulum

```sh
git clone
cd secim-api
npm install or yarn install
npm start or yarn start
```

## API

- /ntv - NTV Milletvekili Seçim Sonuçları
- /ntvCb - NTV Cumhurbaşkanı Seçim Sonuçları
- /cnnturk - CNNTurk Milletvekili ve Cumhurbaşkanı Seçim Sonuçları

## Örnek

- https://localhost.com:3000/ntv - NTV Milletvekili Seçim Sonuçları
- https://localhost.com:3000/ntvCb - NTV Cumhurbaşkanı Seçim Sonuçları
- https://localhost.com:3000/cnnturk - CNNTurk Milletvekili ve Cumhurbaşkanı Seçim Sonuçları

## Lisans

MIT

**Free Software, Hell Yeah!**

