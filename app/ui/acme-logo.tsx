import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';
import '@/public/philanthropia-icon-white (2).svg'
export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white h-full`}
    >
      <p className="text-[15px]">Philanthropia</p>
    </div>
  );
}
