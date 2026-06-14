'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import seta from './assets/images/seta.png';
import hominho from './assets/images/hominhoLogin.png';
import BotaoAnimado from './components/botaoAnimado';

export default function Home() {
  const router = useRouter();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');

  async function handleLogin() {
    // Modo de teste: entra sem validar login e senha
    router.push('/menu');
  }

  return (
    <main>
      <div className="bg-[url('./assets/images/imagemFundoLogin.png')] bg-cover bg-center w-full h-screen">
        <div className="flex items-center justify-center h-full">
          <div className="static bg-white/10 backdrop-blur-md border border-white/20 rounded-4xl shadow-lg p-8 h-90/100 w-90/100">
            <div className="absolute top-0 right-0 z-30">
              <Image
                src={seta}
                height={120}
                width={120}
                alt="Seta"
                className="invert transform rotate-45 z-30 translate-x-1/6 -translate-y-1/6"
              />
            </div>

            <div className="flex align-center h-90/100 w-full p-8">
              <Image
                src={hominho}
                alt="Hominho"
                className="z-10 w-60/100"
              />

              <div className="flex items-center justify-end-safe h-full w-full z-9">
                <div className="flex bg-[#FBFBFB] rounded-2xl p-8 h-full w-50/100 flex-col">
                  <h1 className="text-2xl font-bold self-center p-10">
                    Login
                  </h1>

                  <div className="flex h-full w-full font-bold flex-col p-8">
                    <div className="flex w-full flex-col">
                      <label>Usuário</label>
                      <input
                        type="text"
                        className="border-b-2 focus:outline-none focus:ring-0"
                        placeholder="usuario@gmail.com"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                      />
                    </div>

                    <div className="flex w-full flex-col mt-8">
                      <label>Senha</label>
                      <input
                        type="password"
                        className="border-b-2 focus:outline-none focus:ring-0"
                        placeholder="12345678"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                      />
                    </div>

                    <div className="flex w-full mt-4 justify-between">
                      <div>
                        <input
                          type="checkbox"
                          className="accent-black"
                          name="Lembre-se de mim"
                        />
                        <label className="ml-2 text-sm text-center">
                          Lembre-se de mim
                        </label>
                      </div>

                      <a
                        href="#"
                        className="text-sm self-center text-[#616467] hover:underline"
                      >
                        Esqueci minha senha
                      </a>
                    </div>

                    <BotaoAnimado
                      texto="Entrar"
                      className="self-center p-6 mt-16 w-60/100"
                      onClick={handleLogin}
                    />
                  </div>

                  <div className="absolute right-30/100 bottom-2/100 z-30">
                    <Image
                      src={seta}
                      height={120}
                      width={120}
                      alt="Seta"
                      className="invert transform -rotate-135 -translate-x-1/8 -translate-y-1/4 z-30"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}