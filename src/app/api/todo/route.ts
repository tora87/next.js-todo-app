import { PrismaClient } from "@prisma/client";
import { NextResponse  } from "next/server";

const prisma = new PrismaClient()

export const connect = async () => {
  try {
    await prisma.$connect()
  } catch {
    return Error('Primsa DB 接続に失敗')
  }
}

// Todo取得
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const GET = async( req: Request, res: NextResponse ) => {
  try {
    await connect()
    const todos = await prisma.todo.findMany()
    return NextResponse.json({ message: 'success', todos }, { status: 200 })

  } catch (error) {
    return NextResponse.json({ message: error}, { status: 500 })
  } finally {
    prisma.$disconnect()
  }
}

// Todo 作成
export const POST = async( req: Request, res: NextResponse ) => {
  try {
    const {title} = await req.json()
    await connect()
    const todo = await prisma.todo.create({data:{title}})
    return NextResponse.json({ message: 'success', todo }, { status: 201 })

  } catch (error) {
    return NextResponse.json({ message: error}, { status: 500 })
  } finally {
    prisma.$disconnect()
  }
}
