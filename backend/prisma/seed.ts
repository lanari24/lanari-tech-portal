import { PrismaClient, Role, ProjectStatus, ResourcePriority, ResourceStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Demo admin — change the passkey before any real deployment.
  const passwordHash = await bcrypt.hash('LanariAdmin#2026', 12);
  await prisma.user.upsert({
    where: { email: 'admin@lanari.tech' },
    update: {},
    create: {
      email: 'admin@lanari.tech',
      ref: 'ADM-001-000',
      name: 'Portal Administrator',
      role: Role.ADMIN,
      passwordHash,
      settings: { create: {} },
    },
  });

  // Seed system resources (the management terminal table).
  const resources = [
    { resourceCode: 'RES_LN_7782', name: 'Global Central Neural Hub', allocationNode: 'NODE-7', priority: ResourcePriority.CRITICAL, status: ResourceStatus.ACTIVE, activity: '12.2ms' },
    { resourceCode: 'RES_LN_0911', name: 'Satellite Uplink Station 4', allocationNode: 'UPLINK-SEC-4', priority: ResourcePriority.STANDARD, status: ResourceStatus.ACTIVE, activity: '44.8ms' },
    { resourceCode: 'RES_LN_2210', name: 'Research & Dev Cloud Cluster', allocationNode: 'DEV-CLUSTER-9', priority: ResourcePriority.HIGH, status: ResourceStatus.SYNC_WAIT, activity: '--' },
    { resourceCode: 'RES_LN_5541', name: 'Logistics Automation Grid', allocationNode: 'GRID-WEST-A', priority: ResourcePriority.STANDARD, status: ResourceStatus.ACTIVE, activity: '18.1ms' },
  ];
  for (const r of resources) {
    await prisma.systemResource.upsert({
      where: { resourceCode: r.resourceCode },
      update: {},
      create: r,
    });
  }

  // Seed a few projects.
  const projectCount = await prisma.project.count();
  if (projectCount === 0) {
    await prisma.project.createMany({
      data: [
        { name: 'LanariFlow ERP Integration', codeName: 'LNT-FLOW', client: 'Rwanda Logistics S.A.', leadEngineer: 'Alex Mugisha', progress: 78, status: ProjectStatus.ACTIVE },
        { name: 'Ubumwe Connect API Mesh', codeName: 'UBUMWE-M', client: 'Pan-African Trade union', leadEngineer: 'Diane Umutoni', progress: 95, status: ProjectStatus.ACTIVE },
        { name: 'SecureGrid Decoupled Vault', codeName: 'SECURE-V', client: 'Kigali National Bank', leadEngineer: 'Dr. Aris Thorne', progress: 15, status: ProjectStatus.PIPELINE },
        { name: 'DataCore African Ledger', codeName: 'CORE-LEDG', client: 'Sovereignty Group', leadEngineer: 'Robert Kamanzi', progress: 100, status: ProjectStatus.COMPLETED },
      ],
    });
  }

  console.log('✅ Seed complete');
}

main()
  .catch((err) => {
    console.error(err);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
