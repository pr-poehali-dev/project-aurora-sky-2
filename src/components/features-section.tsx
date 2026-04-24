import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const features = [
  {
    title: "Богатый выбор вкусов",
    description: "Более 30 вкусов: тропические фрукты, свежая мята, ягоды, десерты и классический табак.",
    icon: "taste",
    badge: "30+ вкусов",
  },
  {
    title: "До 6000 затяжек",
    description: "Мощный встроенный аккумулятор и большой объём жидкости обеспечивают длительное использование.",
    icon: "battery",
    badge: "Long-life",
  },
  {
    title: "Никотиновые соли",
    description: "Гладкое и насыщенное попадание никотина без жёсткости — современная формула солевого никотина.",
    icon: "drop",
    badge: "Соль",
  },
  {
    title: "Компактный формат",
    description: "Лёгкий и карманный дизайн — удобно брать с собой везде. Не нужна зарядка или заправка.",
    icon: "pocket",
    badge: "Портативно",
  },
  {
    title: "Контроль качества",
    description: "Каждое устройство проходит проверку на заводе: стабильная тяга, чистый вкус с первой до последней затяжки.",
    icon: "check",
    badge: "Качество",
  },
  {
    title: "Быстрая доставка",
    description: "Отправляем в день заказа. Дискретная упаковка, доставка по всей России.",
    icon: "delivery",
    badge: "Быстро",
  },
]

export function FeaturesSection() {
  return (
    <section id="flavors" className="py-24 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-sans">Почему выбирают нас</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Электронные одноразовые сигареты премиального качества по доступной цене
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="glow-border hover:shadow-lg transition-all duration-300 slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-3xl">
                    {feature.icon === "taste" && "🍓"}
                    {feature.icon === "battery" && "🔋"}
                    {feature.icon === "drop" && "💧"}
                    {feature.icon === "pocket" && "✌️"}
                    {feature.icon === "check" && "✅"}
                    {feature.icon === "delivery" && "🚀"}
                  </span>
                  <Badge variant="secondary" className="bg-accent text-accent-foreground">
                    {feature.badge}
                  </Badge>
                </div>
                <CardTitle className="text-xl font-bold text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
