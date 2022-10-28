let avatar = [
  'https://pic1.zhimg.com/80/v2-286c9c01b8e1e9e9197cf2ef38a268a4_r.jpg',
  'https://pica.zhimg.com/80/v2-97f6e96d931e91538f7c7b6527b75737_r.jpg',
  'https://pic4.zhimg.com/80/v2-8a02a6bb98c190e437c7c17a19fd7378_r.jpg',
  'https://pic1.zhimg.com/80/v2-0fe3f069bff4ae9780c926bc165ba1c6_r.jpg',
  'https://pic3.zhimg.com/80/v2-f35718331b7c698af7bf42689a889bea_r.jpg',
  'https://pic2.zhimg.com/80/v2-1c3a420d384c30deb27de1dff9d91b78_r.jpg',
  'https://pica.zhimg.com/80/v2-dc61097a34c547a75a9ebca5757419dc_r.jpg',
  'https://pic4.zhimg.com/80/v2-61ff848a04b57798d8c0f40f14054a4a_r.jpg',
  'https://pic3.zhimg.com/80/v2-738a80bf6bfd7adc2a30afc1b3937f34_r.jpg',
  'https://pic3.zhimg.com/80/v2-14b1d695debeb668082bfe7f18a06d8f_r.jpg'
]
const random = Date.now()
const res = String(random).charAt(12)
export const randomAvater = avatar[res]
