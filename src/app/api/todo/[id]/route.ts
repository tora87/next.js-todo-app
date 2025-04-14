import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

// Todoを更新する
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
  res: NextResponse
) => {
  const { id } = params;
  try {
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
    await prisma.todo.delete({ where: { id: Number(id) } });
    return NextResponse.json({ message: 'SUCCESS DELETE' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
