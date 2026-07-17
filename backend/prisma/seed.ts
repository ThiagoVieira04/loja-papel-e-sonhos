import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.upsert({
    where: { email: 'admin@papelesonhos.com.br' },
    update: {},
    create: {
      email: 'admin@papelesonhos.com.br',
      password: hashedPassword,
      name: 'Administrador',
      role: 'ADMIN',
      phone: '(21) 98717-2463',
    },
  });

  const categories = [
    { name: 'Papelaria Personalizada', slug: 'papelaria-personalizada', icon: 'fa-wand-magic-sparkles', type: 'product' },
    { name: 'Informática', slug: 'informatica', icon: 'fa-laptop', type: 'service' },
    { name: 'Topos de Bolo', slug: 'topos-de-bolo', icon: 'fa-cake-candles', type: 'product' },
    { name: 'Canecas', slug: 'canecas', icon: 'fa-mug-hot', type: 'product' },
    { name: 'Camisas', slug: 'camisas', icon: 'fa-tshirt', type: 'product' },
    { name: 'Fotos', slug: 'fotos', icon: 'fa-camera', type: 'service' },
    { name: 'Adesivos', slug: 'adesivos', icon: 'fa-note-sticky', type: 'product' },
    { name: 'Agendas', slug: 'agendas', icon: 'fa-book', type: 'product' },
    { name: 'Azulejos', slug: 'azulejos', icon: 'fa-border-all', type: 'product' },
    { name: 'Lembrancinhas', slug: 'lembrancinhas', icon: 'fa-gift', type: 'product' },
    { name: 'Encadernação', slug: 'encadernacao', icon: 'fa-book-open', type: 'service' },
    { name: 'Impressão', slug: 'impressao', icon: 'fa-print', type: 'service' },
    { name: 'Xérox', slug: 'xerox', icon: 'fa-copy', type: 'service' },
    { name: 'Currículos', slug: 'curriculos', icon: 'fa-file-user', type: 'service' },
    { name: 'Imposto de Renda', slug: 'imposto-de-renda', icon: 'fa-calculator', type: 'service' },
    { name: 'MEI', slug: 'mei', icon: 'fa-briefcase', type: 'service' },
    { name: 'INSS', slug: 'inss', icon: 'fa-id-card', type: 'service' },
    { name: 'Auxílio Doença', slug: 'auxilio-doenca', icon: 'fa-kit-medical', type: 'service' },
    { name: 'Aposentadoria', slug: 'aposentadoria', icon: 'fa-user-clock', type: 'service' },
    { name: 'Seguro Desemprego', slug: 'seguro-desemprego', icon: 'fa-hand-holding-dollar', type: 'service' },
    { name: 'Desenvolvimento de Apps', slug: 'desenvolvimento-de-apps', icon: 'fa-mobile-screen-button', type: 'service' },
    { name: 'Formatação', slug: 'formatacao', icon: 'fa-laptop-medical', type: 'service' },
    { name: 'Conserto de Computadores', slug: 'conserto-de-computadores', icon: 'fa-screwdriver-wrench', type: 'service' },
    { name: 'Recuperação GOV', slug: 'recuperacao-gov', icon: 'fa-key', type: 'service' },
  ];

  for (const cat of categories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  console.log('Seed completed successfully');
  console.log(`Admin created: ${admin.email}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
