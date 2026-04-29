import { Link } from "react-router";
import Button from "../component/ui/Button";
import { SpeakerCard } from "../component/ui/SpeakerCard";

export default function Workshop() {
  const speakers = [ 
  { id: 1, name: "Lemon", role: "Mid Laner", img: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/fc004fd37dd0b6c0c7d4be2934e7d7c55ec093573e60b86fe81c7381eba55fd4.png" }, 
  { id: 2, name: "R7", role: "Exp Laner", img: "https://dafunda.com/wp-content/uploads/2023/01/rrq-r7-rehat-mpl-id-s11.jpeg" }, 
  { id: 3, name: "Albert", role: "Jungler", img: "https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,f_auto,q_auto:best,w_640/v1634025439/8f43c5d837f893e7376d0faf30752d53c63990a832fd4332763ae83966c4d332.png" }, 
  ];
  return (
    <div>
        <section
          id='workshop'
          className='py-10 flex gap-10 justify-between items-center'
          >
          <div className='w-1/2'>
          <img
          src="https://www.invofest-harkatnegeri.com/assets/Maskot-Workshop.png"
          alt=""
          />
        </div>
          <div className='w-2/3 flex flex-col gap-6'>
            <h1 className='text-5xl text-pink-700 font-semibold'>IT Workshop</h1>
            <p className='text-sm md:text base lg:text-[1.35rem]'>
              Workshop "AI for a Sustainable Future: The Role of Z Generation in the Digital Era” ini menjembatani antara potensi Generasi Z dan kekuatan AI untuk menciptakan masa depan yang berkelanjutan. Peserta akan dibekali wawasan dan alat untuk mentransformasi ide-ide inovatif menjadi solusi lingkungan yang nyata dan terukur di era digital.
            </p>
          <div className='flex gap-3'> 
              <Link to="/register/event">
                <Button label="Daftar IT Workshop" variant="primary"/>
              </Link>
          </div>
        </div>
        </section>

        <section className="w-full bg-[#FDF2F7] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 uppercase tracking-wider">Tentang IT Workshop</h2>
          <p className="text-slate-700 leading-8 text-lg">
           Workshop “AI for a Sustainable Future: The Role of Z Generation in the Digital Era” ini didesain khusus untuk Generasi Z, 
           para digital natives yang berada di persimpangan antara inovasi teknologi dan tantangan keberlanjutan global. 
           Peserta akan diajak untuk menyelami bagaimana Kecerdasan Buatan (AI) bukan hanya sekadar teknologi canggih, 
           tetapi juga alat yang ampuh untuk menciptakan solusi nyata bagi isu-isu lingkungan. Melalui sesi inspiratif, 
           pengenalan konsep, dan praktik langsung (hands-on), workshop ini bertujuan memberdayakan Gen Z untuk 
           menjadi agen perubahan di era digital, menggunakan keahlian mereka untuk masa depan bumi yang lebih baik.
          </p>
        </div>
      </section>     

       <section
              id='speaker'
              className='py-24'>
                <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-pink-800 mb-20 uppercase tracking-wider">Temui Pembicara Khusus Kami</h2>
                </div>
      
                <div className='grid grid-cols-1 md:grid-cols-3 gap-10 px-3 w-full'>
                  {speakers.map((speaker, index) => (
                    <SpeakerCard
                      key={index}
                      name={speaker.name}
                      role={speaker.role}
                      imageUrl={speaker.img}
                    />
                  ))}
                </div>
        </section>
    </div>
  );
}