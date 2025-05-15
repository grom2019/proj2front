const brigadesByCommand = {
  'ok-skhid': [
    {
      name: '92 ОМБр',
      description: 'Одна з провідних бригад Сходу.',
      image: '/images/brigade1.png',
      type: 'сухопутні',
      category: 'механізована',
      vacancies: [
        {
          title: 'Гранатометник',
          image: '/images/vacancies/granatometnyk.jpg',
          duties: ['Ураження броньованих цілей', 'Підтримка піхоти'],
          requirements: ['Фізична підготовка', 'Точність стрільби'],
          qualifications: ['Проходження курсу бойової підготовки'],
          knowledge: ['Типи гранатометів', 'Техніка прицілювання']
        },
        {
          title: 'Радист',
          image: '/images/vacancies/radyst.jpg',
          duties: ['Зв’язок між підрозділами', 'Робота з радіостанціями'],
          requirements: ['Уважність', 'Точність передачі інформації'],
          qualifications: ['Навички користування Р-105/Р-159'],
          knowledge: ['Радіочастоти', 'Шифрування']
        }
      ]
    },
    {
      name: '54 ОМБр',
      description: 'Ударна механізована бригада.',
      image: '/images/brigade2.png',
      type: 'сухопутні',
      category: 'механізована',
      vacancies: [
        {
          title: 'Навідник-оператор',
          image: '/images/vacancies/navidnyk.jpg',
          duties: ['Наводка на ціль', 'Управління озброєнням БМП'],
          requirements: ['Зір 100%', 'Концентрація'],
          qualifications: ['Курс БМП-2'],
          knowledge: ['Системи наведення', 'Техніка стрільби']
        }
      ]
    }
  ],
  'ok-zakhid': [
    {
      name: '93 ОМБр',
      description: 'Героїчна бригада "Холодний Яр".',
      image: '/images/brigade4.png',
      type: 'сухопутні',
      category: 'механізована',
      vacancies: [
        {
          title: 'Кулеметник',
          image: '/images/vacancies/kulemetnyk.jpg',
          duties: ['Підтримка вогнем', 'Оборона позицій'],
          requirements: ['Стійкість до навантаження'],
          qualifications: ['Курс з кулемета ПКМ'],
          knowledge: ['Обслуговування зброї', 'Тактика стрільби']
        }
      ]
    },
    {
      name: '24 ОМБр',
      description: 'Легендарна "Королева полігонів".',
      image: '/images/brigade5.png',
      type: 'сухопутні',
      category: 'механізована',
      vacancies: [
        {
          title: 'Снайпер',
          image: '/images/vacancies/sniper.jpg',
          duties: ['Точкове знищення цілей', 'Спостереження'],
          requirements: ['Влучність', 'Терпіння'],
          qualifications: ['Снайперський курс'],
          knowledge: ['Оптика', 'Маскування']
        }
      ]
    }
  ],
  'ok-pivden': [
    {
      name: '36 МПБр',
      description: 'Морська піхота південного напряму.',
      image: '/images/brigade7.png',
      type: 'морські',
      category: 'механізована',
      vacancies: [
        {
          title: 'Десантник',
          image: '/images/vacancies/desantnyk.jpg',
          duties: ['Штурм об’єктів', 'Десантування'],
          requirements: ['Фізична підготовка', 'Відвага'],
          qualifications: ['Парашутна підготовка'],
          knowledge: ['Тактика бою', 'Висадка з БТР']
        }
      ]
    }
  ],
  'ok-pivnich': [
    {
      name: '30 ОМБр',
      description: 'Елітна механізована бригада.',
      image: '/images/brigade10.png',
      type: 'сухопутні',
      category: 'механізована',
      vacancies: [
        {
          title: 'Санінструктор',
          image: '/images/vacancies/medic.jpg',
          duties: ['Надання ПМД', 'Евакуація поранених'],
          requirements: ['Медична освіта', 'Стресостійкість'],
          qualifications: ['Курс бойового медика'],
          knowledge: ['Турнікети', 'Тактична медицина']
        }
      ]
    }
  ],
  'center': [
    {
      name: '10 ГШБр',
      description: 'Гірська штурмова бригада.',
      image: '/images/brigade13.png',
      type: 'сухопутні',
      category: 'гірська штурмова',
      vacancies: [
        {
          title: 'Гірський стрілець',
          image: '/images/vacancies/hirskyi.jpg',
          duties: ['Штурм у складній місцевості'],
          requirements: ['Фізична форма', 'Стійкість до висоти'],
          qualifications: ['Гірська підготовка'],
          knowledge: ['Альпінізм', 'Тактика маневру']
        }
      ]
    }
  ]
};

export default brigadesByCommand;
