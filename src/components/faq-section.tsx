import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function FAQSection() {
  const faqs = [
    {
      question: "Сколько затяжек в одном устройстве?",
      answer:
        "В зависимости от модели — от 2000 до 6000 затяжек. Точное количество указано на упаковке каждого устройства. Мы продаём только проверенные модели с реальным ресурсом.",
    },
    {
      question: "Можно ли зарядить одноразовую сигарету?",
      answer:
        "Классические одноразки не предназначены для зарядки — они рассчитаны на весь ресурс жидкости. Некоторые модели имеют порт зарядки для удобства дозарядки аккумулятора, но это не меняет факт — жидкость одноразовая.",
    },
    {
      question: "Какой никотин используется?",
      answer:
        "В наших устройствах используется солевой никотин — он обеспечивает мягкое и насыщенное попадание без резкости в горле. Концентрация указана на упаковке: как правило 20 или 50 мг/мл.",
    },
    {
      question: "Как долго доставляете?",
      answer:
        "Отправляем в день заказа при оформлении до 15:00. Срок доставки по России: 1-3 дня в крупные города, 3-7 дней в отдалённые регионы. Работаем через СДЭК, Почту России и курьерские службы.",
    },
    {
      question: "Есть ли минимальный заказ?",
      answer:
        "Нет минимального заказа — можно купить даже одно устройство. При заказе от 5 штук действует скидка. Уточняйте актуальные условия у менеджера.",
    },
    {
      question: "Как выбрать подходящий вкус?",
      answer:
        "Если вы только начинаете — рекомендуем попробовать фруктовые вкусы (манго, клубника) или ментол. Любителям классики подойдут табачные варианты. Наш менеджер поможет подобрать вкус под ваши предпочтения.",
    },
  ]

  return (
    <section className="py-24 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-orbitron">Частые вопросы</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto font-space-mono">
            Отвечаем на популярные вопросы о наших устройствах, составе и доставке.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-red-500/20 mb-4">
                <AccordionTrigger className="text-left text-lg font-semibold text-white hover:text-red-400 font-orbitron px-6 py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 leading-relaxed px-6 pb-4 font-space-mono">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
