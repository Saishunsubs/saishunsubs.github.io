export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  tag: string;
  snippet: string;
  image: string;
  content?: string;
}

export const posts: Post[] = [
  {
    id: '1',
    title: 'Asai Konomi Blog [2025.12.02]',
    author: 'Nan4',
    date: 'December 03, 2025',
    tag: 'Sakurazaka46',
    snippet: '"Tuntas" 2025.12.02~~~ Original Blog Here. Terima kasih telah membuka blogku ☺️ Sakurazaka46, generasi 4🌸 As…',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_tWMmDHw6kYEfduv7qzw-WwfspyBZBE8yZVj8YA_abAmYt8UH5W647-HXcxkQW4ZSDGOdQeGNO_S_Dv1b4DUbdaxf2cGZDUwNECo8t6q6Hyd0UQ9NeFtFMsu4unxN_Zt5u1E7SCv_yjfcftu2_HHA=w1200-h630-p-k-no-nu',
    content: `<h2>"Tuntas"</h2>
<p>2025.12.02~~~</p>
<p><a href="https://sakurazaka46.com/s/s46/diary/blog/detail/56879" target="_blank">Original Blog Here</a></p>
<p>Terima kasih telah membuka blogku ☺️</p>
<p>Sakurazaka46, generasi 4🌸</p>
<p>Asai Konomi disini!</p>
<p>Hari ini aku ingin berbagi tentang kegiatanku...</p>`,
  },
  {
    id: '2',
    title: 'Asai Konomi Blog [2025.11.10] Translate',
    author: 'Nan4',
    date: 'November 29, 2025',
    tag: 'Sakurazaka46',
    snippet: '"Rajutan Tebal" 2025.11.10~~~ Original Blog Here. Terima kasih telah membuka blogku ☺️ Generasi 4 Sakurazaka46🌸 Asai…',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_v1EYBlv7tO2S0NSe4hed3U0epehRyNFxWWQecQvz5YTsKxMsM6DIixS-P-YuD_3y5QaANwj-vOZXbQMrIzR7RUA70R13gkqHnA-9-FmJ8hNciKuBdkkb6yonAZrRlbhiwo0TAg3EuOIrmK46_725k=w1200-h630-p-k-no-nu',
  },
  {
    id: '3',
    title: 'Asai Konomi Blog [2025.11.17] Translate',
    author: 'Nan4',
    date: 'November 21, 2025',
    tag: 'Sakurazaka46',
    snippet: '"Melangkah Maju" 2025.11.17~~~ Original Blog Here. Terima kasih ya telah membuka blogku ☺️ Generasi 4 Sakurazaka46 🌸 Aku Asai Konomi…',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_sdaYn8MivKSD6HDOwYBbWPkdUMxl4bYWOczWzo-wEDFg-fN-gZ8-6HbCktOdUoMu4ki1m65RyNnlx5lIdNsDCOC-_z1OfRmyhGFQXRGBK_AZ-7T0_Wmp0NUro3260yyg7Hq9M8JO1JkAxmpGzjHG0=w1200-h630-p-k-no-nu',
  },
  {
    id: '4',
    title: 'Katsumata Haru Blog [2025.10.29] Translate',
    author: 'Nan4',
    date: 'November 14, 2025',
    tag: 'Sakurazaka46',
    snippet: '"Hari ini" 2025.10.29~~~ Original Blog Here. Selamat malam~ 🌙 Katsumata Haru disini! Hari ini, 29 Oktober (Rabu), Single ke-13…',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_s4onAqSMx3mnSKkcDSTLD7K4rCiWvvowlXzh50U_hB4eVaWHMvz1VWlkSlwX_hNWpabg1Oils8E-D3uVedON-2Gq0OMbkoBW76jfpcUeL7luS-6j1bX27OKACZihck-_N0kNziwVwfMMUmwo9obBA=w1200-h630-p-k-no-nu',
  },
  {
    id: '5',
    title: 'Katsumata Haru Blog [2025.11.01] Translate',
    author: 'Nan4',
    date: 'November 12, 2025',
    tag: 'Sakurazaka46',
    snippet: '"Memilih antara dua pilihan" 2025.11.01~~~ Original Blog Here. Ini juga aku dapat dari Momo-chan lho. MOMOMOMO Pertama, Pengumuman?…',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_thJ0Lf6cy6oShWhxoOp60YmSO9_kQu3VDQDCSCIcghW1RzV4pHYPK6Qx0zjhylNscfJY28mc-SCnB41US2YtAXSBmElDSKaj22drBOqr_Y29ySbDPMzIdkQe-TbOc2KyGOmfhdOqET_tNye-qoEGs=w1200-h630-p-k-no-nu',
  },
  {
    id: '6',
    title: 'Katsumata Haru Blog [2025.11.10] Translate',
    author: 'Nan4',
    date: 'November 11, 2025',
    tag: 'Sakurazaka46',
    snippet: '"Satu hari bersama Polisi Katsumata 👮" 2025.11.10~~~ Original Blog Here. Halo, lama tak jumpa! Aku Katsumata Haru dari generasi 4〜 Pada…',
    image: 'https://lh3.googleusercontent.com/blogger_img_proxy/AEn0k_un4fPApsdkXQeLXoIPP0XvHkqVN2vUWzmmI1g9v8GuVkcYMu60zFvzoE41UPAL5B4qwbqkcexqvd1U1B9DFv5t2pPzo6qWIp37pM_zVYqycMnh71re65_PJ5QbE1qmiA7J6-S4qIBun8aRjC72NWQ=w1200-h630-p-k-no-nu',
  },
];
