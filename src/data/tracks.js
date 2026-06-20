export const TRACKS = [
  {
    id: 'shinkai_trial',
    series: 'nature',
    name: '深海の静けさ',
    band: 'DELTA ・ 0.5–4Hz',
    tag: 'デルタ波 ・ 睡眠導入',
    free: true,
    duration: '3:00',
    orb: 'radial-gradient(circle at 30% 30%, #3A6E8F, #0B1E2E)',
    description: '重力から解き放たれ、意識が深く沈んでいく。身体の緊張が一つずつほどけていきます。クジラの声と波音に包まれながら、深い眠りへと運ばれていく体験です。',
    audio: {
      soft:    import.meta.env.BASE_URL + 'audio/shinkai_trial_soft.mp3',
      deep:    import.meta.env.BASE_URL + 'audio/shinkai_trial_deep.mp3',
      deepest: import.meta.env.BASE_URL + 'audio/shinkai_trial_deepest.mp3',
    },
  },
  {
    id: 'shinkai',
    series: 'nature',
    name: '深海の呼吸',
    band: 'DELTA ・ 0.5–4Hz',
    tag: 'デルタ波 ・ 睡眠導入 ・ 8分',
    free: false,
    orb: 'radial-gradient(circle at 30% 30%, #3A6E8F, #0B1E2E)',
    description: '重力から解き放たれ、意識が深く沈んでいく。身体の緊張が一つずつほどけていきます。クジラの声と波音に包まれながら、深い眠りへと運ばれていく体験です。',
    audio: {
      soft:    import.meta.env.BASE_URL + 'audio/shinkai_soft.mp3',
      deep:    import.meta.env.BASE_URL + 'audio/shinkai_deep.mp3',
      deepest: import.meta.env.BASE_URL + 'audio/shinkai_deepest.mp3',
    },
  },
  {
    id: 'forest',
    series: 'nature',
    name: '聖なる森',
    band: 'THETA ・ 4–8Hz',
    tag: 'シータ波 ・ 瞑想・直感 ・ 8分',
    free: false,
    orb: 'radial-gradient(circle at 30% 30%, #5A7A4E, #16241A)',
    description: '覚醒と眠りの境界に、静かに足を踏み入れる。鳥の声が遠くに響く、神秘の森の中。思考が緩み、直感とひらめきが自然と満ちていく瞑想体験です。',
    audio: {
      soft:    import.meta.env.BASE_URL + 'audio/forest_soft.mp3',
      deep:    import.meta.env.BASE_URL + 'audio/forest_deep.mp3',
      deepest: import.meta.env.BASE_URL + 'audio/forest_deepest.mp3',
    },
  },
  {
    id: 'hikari',
    series: 'nature',
    name: '光の中へ',
    band: 'ALPHA ・ 8–13Hz',
    tag: 'アルファ波 ・ リラックス ・ 8分',
    free: false,
    orb: 'radial-gradient(circle at 30% 30%, #E8D7B0, #B98E4E)',
    description: '張りつめていた心が、少しずつほどけていく。柔らかな光に包まれる、安心の時間。緊張から解放され、穏やかな満ち足りた気持ちに包まれます。',
    audio: {
      soft:    import.meta.env.BASE_URL + 'audio/hikari_soft.mp3',
      deep:    import.meta.env.BASE_URL + 'audio/hikari_deep.mp3',
      deepest: import.meta.env.BASE_URL + 'audio/hikari_deepest.mp3',
    },
  },
  {
    id: 'genshi',
    series: 'nature',
    name: '原初の大地',
    band: 'BETA ・ 13–20Hz',
    tag: 'ベータ波 ・ 集中・覚醒 ・ 9分',
    free: false,
    orb: 'radial-gradient(circle at 30% 30%, #E8845A, #6E2A1E)',
    description: '意識がはっきりと冴えわたっていく。大地のエネルギーが足元から満ちていく。内側から力が湧き上がり、集中と活力に満たされていく体験です。',
    audio: {
      soft:    import.meta.env.BASE_URL + 'audio/genshi_soft.mp3',
      deep:    import.meta.env.BASE_URL + 'audio/genshi_deep.mp3',
      deepest: import.meta.env.BASE_URL + 'audio/genshi_deepest.mp3',
    },
  },
  {
    id: 'cosmos',
    series: 'nature',
    name: '星の小宇宙',
    band: 'GAMMA ・ 30Hz+',
    tag: 'ガンマ波 ・ 拡張意識 ・ 15分',
    free: false,
    orb: 'radial-gradient(circle at 30% 30%, #6E5A9E, #1A1430)',
    description: '自分という境界が、静かに溶けていく。星々のきらめきの中、意識が大きく広がっていく感覚。普段とは違う視点から、世界を見つめる時間です。',
    audio: {
      soft:    import.meta.env.BASE_URL + 'audio/cosmos_soft.mp3',
      deep:    import.meta.env.BASE_URL + 'audio/cosmos_deep.mp3',
      deepest: import.meta.env.BASE_URL + 'audio/cosmos_deepest.mp3',
    },
  },
]

export const STORY_SERIES = [
  { id: 'angel', name: '天使' },
  { id: 'dream', name: '淡い夢' },
  { id: 'womb',  name: '胎内夢' },
  { id: 'god',   name: '神' },
  { id: 'plant', name: '植物幻覚' },
]

export const FREE_TRACK = TRACKS.find(t => t.free)
export const PAID_TRACKS = TRACKS.filter(t => !t.free)

export const FREQ_GUIDE = [
  { hz: '0.5–4 Hz',  name: 'デルタ波',  desc: '深いノンレム睡眠と関連。就寝前・寝つけない夜に。',                       orb: TRACKS[0].orb },
  { hz: '4–8 Hz',    name: 'シータ波',  desc: 'まどろみ・瞑想時の深い集中。ひらめきとの関連が研究されています。',       orb: TRACKS[2].orb },
  { hz: '8–13 Hz',   name: 'アルファ波', desc: 'リラックス状態に多く見られる脳波帯。緊張のゆるみと関連。',              orb: TRACKS[3].orb },
  { hz: '13–20 Hz',  name: 'ベータ波',  desc: '覚醒し、思考や作業に向いている状態。集中力の維持をサポート。',          orb: TRACKS[4].orb },
  { hz: '30 Hz+',    name: 'ガンマ波',  desc: '高次の認知・拡張した意識状態との関連が研究されています。',               orb: TRACKS[5].orb },
]
