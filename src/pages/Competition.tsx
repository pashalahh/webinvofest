import { Link } from "react-router";
import Button from "../component/ui/Button";
import { Card } from '../component/ui/CardProduct';



export default function Competition() {
  const competitions = [
    {
      title: "Web Design Competition",
      category: "IT Competition",
      description: "Web Design Competition ini adalah kompetisi untuk menciptakan suatu perangkat lunak berbasis website yang menggunakan desain menarik, unik, dan responsive pada semua device serta sesuai dengan tema kompetisi.",
      image: "https://www.invofest-harkatnegeri.com/assets/competition-card/web_design.png"
    },
    {
      title: "UI/UX Design Competition",
      category: "IT Competition",
      description: "UI/UX Design Competition ini adalah kompetisi untuk menciptakan dan merancang inovasi sebuah produk digital yang dapat berupa website maupun mobile apps serta dapat membuat nyaman calon pengguna.",
      image: "https://www.invofest-harkatnegeri.com/assets/competition-card/ui_ux.png"
    },
    {
      title: "Poster Design Competition",
      category: "IT Competition",
      description: "Poster Design Competition ini adalah kompetisi untuk menciptakan suatu karya dalam bentuk poster digital yang komunikatif dan inspiratif, guna menyuarakan gagasan atau solusi visual terhadap permasalahan yang ada sekarang ini.",
      image: "https://www.invofest-harkatnegeri.com/assets/competition-card/software_dev.png"
    }
  ];
  return (
    <div>
      <section
        id='competition'
        className='py-10 flex gap-10 justify-between items-center'
      >
      <div className='w-2/3 flex flex-col gap-6'>
      <h1 className='text-5xl text-pink-700 font-semibold'>IT Competition</h1>
      <p className='text-sm md:text base lg:text-[1.35rem]'>
      <b>"From Creation to Innovation"</b> adalah sebuah kompetisi IT yang dirancang untuk menjembatani jurang antara ide kreatif dan inovasi nyata. Ajang ini menantang para talenta digital untuk tidak hanya menciptakan sesuatu yang baru, tetapi juga mengembangkannya menjadi solusi yang berdampak, berkelanjutan, dan bernilai guna tinggi.
      </p>
      <div className='flex gap-3'> 
      <Link to="/register/event">
        <Button label="Daftar IT Competition" variant="primary"/>
      </Link>
      </div>
      </div>
        <div className='w-2/3'>
          <img
          src="https://www.invofest-harkatnegeri.com/assets/Maskot-Lomba.png"
          alt=""
          />
          </div>
      </section>

      <section className="w-full bg-[#FDF2F7] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-pink-800 mb-6 uppercase tracking-wider">Tentang IT Competition</h2>
          <p className="text-slate-700 leading-8 text-lg">
            Kompetisi atau perlombaan yang ada dalam kegiatan <b>INVOFEST (Informatics Vocational Festival) 2025</b> ini 
            bertujuan mengajak generasi muda untuk mengembangkan inovasi dan kreativitas guna membentuk kelompok yang memiliki 
            potensi luar biasa. Melalui pendekatan ini, diharapkan generasi ini akan berperan dalam menciptakan solusi-solusi baru 
            untuk tantangan masa kini dan mendatang.
          </p>
        </div>
      </section>

      <section className="w-full py-20 px-6 md:px-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-4xl font-bold text-pink-800 mb-12">DAFTAR KOMPETISI</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {competitions.map((item, index) => (
              <Card 
                key={index} 
                image={item.image}
                className="bg-white p-8 rounded-2xl shadow-lg border-l-12px border-pink-700 flex flex-col h-full hover:-translate-y-2 transition-all duration-300"
              >
                <div className="mb-6">
                  <span className="text-xs font-black text-pink-600 uppercase tracking-[0.2em]">
                    {item.category}
                  </span>
                  <h2 className="text-2xl font-bold text-slate-800 mt-2">{item.title}</h2>
                </div>
                
                <p className="text-slate-600 mb-8 leading-relaxed">
                  {item.description}
                </p>

                <div className="mt-auto">
                  <Button 
                    label="Detail Lomba" 
                    variant="primary" 
                    className="w-full"
                    onClick={() => window.location.href = `/competition/${item.title.toLowerCase().replace(' ', '-')}`}
                  />
                </div>
              </Card>
            ))}
            </div>
          </div>
        </section>
    </div>
  );
}