import Pedidos from "./Pedidos"

export default function Me() {
  const userData = {
    email: 'nicolasnleao@gmail.com',
    name: 'Nicolas Leão',
  }
  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Pedidos />
    </div>
  )
}