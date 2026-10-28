import { Link } from 'react-router-dom';
import { siteInfo } from '../data/site';
import Container from './Container';
import { MailIcon, MapPinIcon } from './Icons';
import { menuItems } from './menu';
import PrivacyNotice from './PrivacyNotice';

// 하단 정보: 연구실 소개, 바로가기, 연락처, 개인정보 주의 안내
export default function Footer() {
  return (
    <footer className="bg-brand-900 text-sm text-white/70">
      <Container className="grid gap-10 py-12 md:grid-cols-[2fr_1fr_2fr]">
        <div>
          <p className="text-base font-bold text-white">{siteInfo.labName}</p>
          <p className="mt-1">{siteInfo.labNameEn}</p>
          <p className="mt-4">
            {siteInfo.university} · {siteInfo.professor}
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white uppercase">Menu</p>
          <ul className="mt-4 space-y-2">
            {menuItems.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-white uppercase">Contact</p>
          <ul className="mt-4 space-y-3">
            <li className="flex items-start gap-2.5">
              <MapPinIcon className="mt-0.5 h-4 w-4 shrink-0" />
              {siteInfo.address}
            </li>
            <li className="flex items-start gap-2.5">
              <MailIcon className="mt-0.5 h-4 w-4 shrink-0" />
              <a href={`mailto:${siteInfo.email}`} className="hover:text-white">
                {siteInfo.email}
              </a>
            </li>
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <PrivacyNotice variant="dark" />
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} {siteInfo.labNameEn}
          </p>
        </Container>
      </div>
    </footer>
  );
}
