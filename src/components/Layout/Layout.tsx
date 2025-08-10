import React, { useState } from 'react';
import { Footer } from '../Footer';
import { Header } from '../Header';
import { Main } from '../Main';
import { Menu } from '../Menu';

interface Props {
  children: React.ReactNode;
}

export const Layout: React.FC<Props> = ({ children }) => {
  const [isMenu, setIsMenu] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  return (
    <>
      <Header isMenu={isMenu} onMenu={setIsMenu} isSearch={isSearch} onSearch={setIsSearch} />
      <Menu isOpen={isMenu} onClose={() => setIsMenu(false)}></Menu>
      <Main>{children}</Main>
      <Footer />
    </>
  );
};
