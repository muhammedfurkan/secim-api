const fastify = require('fastify')
const dayjs = require('dayjs')
const app = fastify()



const getNtvSonuc = require('./src/getNtvSonuc')
const getNtvCB = require('./src/getNtvSonuc')
const getCnnTurkSonuc = require('./src/getCnnTurkSonuc')


app.get('/', async function (request, reply) {
  reply.type('application/json').send({
    message: 'API Çalışıyor',
    status: 'success'
  })
})


app.get('/ntvCB', async function (request, reply) {
  data = await getNtvCB()
  const updatedDate = dayjs(data.updatedAt).format('DD.MM.YYYY HH:mm:ss')
  const resultData = data.data
  let parsedData = []
  const result = resultData.map((item) => {
    parsedData.push({
      plaka: item.id ? item.id.length === 1 ? '0' + item.id : item.id : null,
      il: item.cn,
      toplamOyKullanacakSecmenSayisi: item.tpc,
      toplamOyKullananSecmenSayisi: item.tvc, 
      acilanSandikSayisi: item.tbc,
      katilimOrani: item.pp,
      toplamSecmenSayisi: item.tpc,
      kullanilanOySayisi: item.uvc,
      geceliOySayisi: item.vvc,

      ittifaklar: item.uns.map((parti) => {
        if(parti.prts.length > 0) {
          return {
            parti: parti.un,
            ittifakOyOranı: parti.vp,
            ittifakOySayisi: parti.vc,
            partiler: parti.prts.map((parti) => {
              return {
                parti: parti.pn,
                partiOyOranı: parti.vp,
                partiOySayisi: parti.vc
              }
            })
          }
        }
      }),
      
    })
  })
  reply.type('application/json').send({
    guncellemeTarihi: updatedDate,
    // data: data,
    data: parsedData
  })
})






app.get('/ntv', async function (request, reply) {
  const data = await getNtvSonuc()
  const updatedDate = dayjs(data.updatedAt).format('DD.MM.YYYY HH:mm:ss')
  const resultData = data.data
  let parsedData = []
  const result = resultData.map((item) => {
    parsedData.push({
      plaka: item.id ? item.id.length === 1 ? '0' + item.id : item.id : null,
      il: item.cn,
      toplamOyKullanacakSecmenSayisi: item.tpc,
      toplamOyKullananSecmenSayisi: item.tvc, 
      acilanSandikSayisi: item.tbc,
      katilimOrani: item.pp,
      toplamSecmenSayisi: item.tpc,
      kullanilanOySayisi: item.uvc,
      geceliOySayisi: item.vvc,

      ittifaklar: item.uns.map((parti) => {
        if(parti.prts.length > 0) {
          return {
            parti: parti.un,
            ittifakOyOranı: parti.vp,
            ittifakOySayisi: parti.vc,
            partiler: parti.prts.map((parti) => {
              return {
                parti: parti.pn,
                partiOyOranı: parti.vp,
                partiOySayisi: parti.vc
              }
            })
          }
        }
      }),
      
    })
  })
  reply.type('application/json').send({
    guncellemeTarihi: updatedDate,
    // data: data,
    data: parsedData
  })
})


app.get('/cnnturk', async function (request, reply) {
  const data = await getCnnTurkSonuc()
  const guncellemeTarihi = data.updateDate
  const cbaskanligi = {
    ...data.presidentChest,
    toplamOyKullanan: data.presidentChest.totalVoter,
    gecerliOySayisi: data.presidentChest.validVote,
    gecersizOySayisi: data.presidentChest.invalidVote,
    katilimOrani: data.presidentChest.totalJoinPercent,
    toplamSandik: data.presidentChest.totalChest,
    toplamAcilanSandik: data.presidentChest.totalOpenChestPercent,
    acilanSandik: data.presidentChest.openChest,
    milletvekiliSayisi: data.presidentChest.deputyCount,
  }
  const cmeclis = {
    ...data.deputyChest,
    toplamOyKullanan: data.deputyChest.totalVoter,
    gecerliOySayisi: data.deputyChest.validVote,
    gecersizOySayisi: data.deputyChest.invalidVote,
    katilimOrani: data.deputyChest.totalJoinPercent,
    toplamSandik: data.deputyChest.totalChest,
    toplamAcilanSandik: data.deputyChest.totalOpenChestPercent,
    acilanSandik: data.deputyChest.openChest,
    milletvekiliSayisi: data.deputyChest.deputyCount,
  }

  const cbaskanlari = data.presidentCandidates.map((item) => {
    return {
      ...item,
      isim: item.displayName,
      ittifak: item.alliance,
      oy: item.vote,
      oyOrani: item.votePercent,
    }
  })


  const cbaskanlariToplam = data.presidentSummary.map((item) => {
    return {
      ...item,
      isim: item.displayName,
      ittifak: item.alliance,
      oy: item.vote,
      oyOrani: item.votePercent,
      turkiyeOy: item.turkeyVote,
      turkiyeOyOrani: item.turkeyVotePercent,
      yurtDisiOy: item.abroadVote,
      yurtDisiOyOrani: item.abroadVotePercent,
    }
  })

  const cbaskanlariIllerBazında = data.presidentMap.map((item) => {
    const detay = item.details.map((item) => {
      return {
        ...item,
        isim: item.displayName,
        ittifak: item.alliance,
        oy: item.vote,
        oyOrani: item.votePercent,
        il: item.cityName,
        ilPlaka: item.cityCode,
      }
    })
    let sandikDurumu = {
      ...item.chestModel,
      toplamSandik: item.chestModel.totalChest,
      toplamAcilanSandikOrani: item.chestModel.totalOpenChestPercent,
      toplamAcilanSandik: item.chestModel.openChest,
      toplamOyKullanan: item.chestModel.totalVoter,
      gecerliOySayisi: item.chestModel.validVote,
      gecersizOySayisi: item.chestModel.invalidVote,
      katilimOrani: item.chestModel.totalJoinPercent,
    }
    return {
      ...item,
      il: item.regionName,
      ilPlaka: item.regionNo ? item.regionNo.length === 1 ? '0' + item.regionNo : item.regionNo : null,
      sandikDurumu: sandikDurumu,
      detay: detay
    }
  })

  reply.type('application/json').send({
    guncellemeTarihi: guncellemeTarihi,
    cbaskanligi: cbaskanligi,
    cmeclis: cmeclis,
    cbaskanlari: cbaskanlari,
    cbaskanlariToplam: cbaskanlariToplam,
    cbaskanlariIllerBazında: cbaskanlariIllerBazında,

  })
})

app.listen(3000, function (err, address) {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening on ` + address)
})