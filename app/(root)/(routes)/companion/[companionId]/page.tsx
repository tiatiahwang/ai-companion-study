import { auth, redirectToSignIn } from '@clerk/nextjs';
import prismadb from '@/lib/db';

import CompanionForm from './components/companion-form';

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

const CompanionIdPage = async ({
  params,
}: CompanionIdPageProps) => {
  //TODO: check subscription
  const { userId } = auth();

  if (!userId) {
    return redirectToSignIn();
  }

  const companion = await prismadb.companion.findUnique({
    where: {
      id: params.companionId,
      userId,
    },
  });

  const categories = await prismadb.category.findMany();

  return (
    <CompanionForm
      initialData={companion}
      categories={categories}
    />
  );
};

export default CompanionIdPage;
