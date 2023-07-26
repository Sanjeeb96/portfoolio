import Image from "next/image";
import Link from "next/link";

import { NavLinks } from "@/constants";
import AuthProviders from "@/components/AuthProviders";
import { getCurrentUser } from "@/lib/session";
import ProfileMenu from "@/components/ProfileMenu";

const Navbar = async () => {
  const session = await getCurrentUser();
  return (
    <nav className="flex justify-between items-center py-5 px-8 border-b border-nav-border gap-4">
      <div className="flex items-center justify-start flex-1 gap-10">
        {/* Main logo of the site */}

        <Link href="/">
          <Image
            src="/logo2.png"
            width={115}
            height={43}
            alt="Portfoolio"
            priority={!!true}
          />
        </Link>

        {/* Navbar Links through Map function */}

        <ul className="lg:flex hidden text-sm gap-5 ">
          {NavLinks.map((link) => (
            <Link href={link.href} key={link.key}>
              {link.text}
            </Link>
          ))}
        </ul>
      </div>

      {/* User Detail & Authantication */}

      <div className="flex items-center justify-center gap-4">
        {session?.user ? (
          <>
            <ProfileMenu session={session} />

            <Link href="/create-project">share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
