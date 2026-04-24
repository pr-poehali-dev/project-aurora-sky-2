import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
  {
    name: "Алексей К.",
    role: "Постоянный покупатель",
    avatar: "/cybersecurity-expert-man.jpg",
    content:
      "Заказываю уже полгода — качество стабильное, вкусы насыщенные. Особенно нравится манго-лёд, беру по 5 штук сразу.",
  },
  {
    name: "Мария С.",
    role: "Покупатель",
    avatar: "/professional-woman-scientist.png",
    content:
      "Быстрая доставка, дискретная упаковка. Попробовала клубнику — теперь это мой фаворит. Рекомендую всем подругам!",
  },
  {
    name: "Дмитрий В.",
    role: "Постоянный покупатель",
    avatar: "/placeholder-user.jpg",
    content:
      "Перешёл с обычных сигарет — не пожалел. Цена нормальная, затяжки плавные, без резкости. До следующего заказа!",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 px-6 bg-card">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-card-foreground mb-4 font-sans">Отзывы покупателей</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Что говорят те, кто уже попробовал наши одноразки
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="glow-border slide-up" style={{ animationDelay: `${index * 0.15}s` }}>
              <CardContent className="p-6">
                <p className="text-card-foreground mb-6 leading-relaxed italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-primary">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
