import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export const connect = async () => {
  try {
    await prisma.$connect();
  } catch {
    return Error('Primsa DB 接続に失敗');
  }
};

// Todoを更新する
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const { id } = params;
  try {
    prisma.$connect();
    const todo = await prisma.todo.update({
      where: { id: Number(id) },
      data: {},
    });
    return NextResponse.json(
      { message: 'SUCCESS UPDATE', todo },
      { status: 204 }
    );
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};

// Todoを削除する
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const { id } = params;
  try {
    prisma.$connect();
    await prisma.todo.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'SUCCESS DELETE' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
