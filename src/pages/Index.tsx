import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface Product {
  name: string;
  provider: string;
  description: string;
  url: string;
  icon: string;
}

interface Database {
  name: string;
  provider: string;
  description: string;
  host: string;
  port: string;
  protocol: string;
  additionalInfo?: string;
  icon: string;
}

const httpServices: Product[] = [
  {
    name: "Airflow",
    provider: "docker",
    description: "Платформа для создания, планирования и мониторинга рабочих процессов (workflows). Управляйте DAG'ами и автоматизируйте ETL-процессы.",
    url: "http://airflow.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Gitea",
    provider: "docker",
    description: "Лёгкий и быстрый сервис управления Git-репозиториями. Альтернатива GitHub для внутренней разработки с поддержкой CI/CD.",
    url: "http://gitea.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Grafana",
    provider: "docker",
    description: "Платформа для визуализации метрик и создания дашбордов. Интеграция с Prometheus, InfluxDB и другими источниками данных.",
    url: "http://grafana.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Jenkins",
    provider: "file",
    description: "Сервер непрерывной интеграции и доставки (CI/CD). Автоматизируйте сборку, тестирование и деплой приложений.",
    url: "http://jenkins.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Jupyter",
    provider: "docker",
    description: "Интерактивная среда для анализа данных, машинного обучения и научных вычислений. Поддержка Python, R, Julia и других языков.",
    url: "http://jupyter.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Kafka UI",
    provider: "docker",
    description: "Веб-интерфейс для управления Apache Kafka. Просмотр топиков, consumer groups, мониторинг потоков данных.",
    url: "http://kafka.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "MinIO",
    provider: "docker",
    description: "Высокопроизводительное объектное хранилище с совместимостью Amazon S3 API. Храните и управляйте большими объёмами данных.",
    url: "http://minio.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Node Exporter",
    provider: "file",
    description: "Экспортер метрик системы для Prometheus. Мониторинг CPU, памяти, дисков и сетевых интерфейсов серверов.",
    url: "http://node-exporter.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "OpenProject",
    provider: "docker",
    description: "Платформа для управления проектами с поддержкой Agile, Scrum и Kanban. Планируйте задачи, треккайте прогресс и организуйте команду.",
    url: "http://openproject.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Portainer",
    provider: "docker",
    description: "Графический интерфейс для управления Docker контейнерами, образами, сетями и томами. Упрощает DevOps операции.",
    url: "http://portainer.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Prometheus",
    provider: "docker",
    description: "Система мониторинга и алертинга с мощным языком запросов PromQL. Собирайте метрики и настраивайте оповещения.",
    url: "http://prometheus.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Spark Master",
    provider: "docker",
    description: "Главный узел Apache Spark кластера. Управление распределёнными вычислениями для обработки больших данных.",
    url: "http://spark-master.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Spark Worker",
    provider: "docker",
    description: "Рабочий узел Apache Spark. Выполняет задачи распределённых вычислений под управлением Spark Master.",
    url: "http://spark-worker.de-infra.servehttp.com",
    icon: "🔧"
  },
  {
    name: "Traefik Dashboard",
    provider: "docker",
    description: "Панель управления Traefik reverse proxy. Мониторинг маршрутов, сервисов, middleware и метрик прокси-сервера.",
    url: "http://traefik.de-infra.servehttp.com",
    icon: ":🔧"
  }
];

const databases: Database[] = [
  {
    name: "ClickHouse",
    provider: "docker",
    description: "Колоночная СУБД для онлайн аналитической обработки (OLAP). Высокая производительность на больших объёмах данных.",
    host: "clickhouse.de-infra.servehttp.com",
    port: "9000",
    protocol: "TCP (native)",
    additionalInfo: "HTTP порт: 8123",
    icon: "🗄️"
  },
  {
    name: "Greenplum",
    provider: "docker",
    description: "Массивно-параллельная СУБД на базе PostgreSQL. Для аналитики и хранилищ данных (Data Warehouse).",
    host: "greenplum.de-infra.servehttp.com",
    port: "5432",
    protocol: "TCP (PostgreSQL)",
    additionalInfo: "Пользователь: gpadmin",
    icon: "🗄️"
  },
  {
    name: "PostgreSQL",
    provider: "docker",
    description: "Объектно-реляционная СУБД с поддержкой сложных запросов, транзакций и расширений. Надёжное решение для OLTP.",
    host: "postgres.de-infra.servehttp.com",
    port: "5432",
    protocol: "TCP (PostgreSQL)",
    additionalInfo: "База данных: postgres",
    icon: "🗄️"
  },
  {
    name: "Gitea-SSH",
    provider: "docker",
    description: "Лёгкий и быстрый сервис управления Git-репозиториями. Альтернатива GitHub для внутренней разработки с поддержкой CI/CD.",
    host: "gitea-ssh.de-infra.servehttp.com",
    port: "5432",
    protocol: "TCP (PostgreSQL)",
    additionalInfo: "База данных: postgres",
    icon: "🔐"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-primary-glow to-accent p-5">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="text-center text-white mb-10 py-8">
          <h1 className="text-5xl font-bold mb-3 drop-shadow-lg">🚀 DE Infrastructure</h1>
          <p className="text-lg opacity-90">Центральный портал доступа к продуктам и сервисам</p>
        </header>

        {/* HTTP Services Section */}
        <section className="bg-card rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-3 border-b-4 border-primary">
            🌐 HTTP Сервисы
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {httpServices.map((service) => (
              <Card
                key={service.name}
                className="p-5 bg-gradient-to-br from-secondary to-muted hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-primary"
              >
                <h3 className="text-xl font-bold text-card-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">{service.icon}</span>
                  {service.name}
                </h3>
                <p className="text-xs text-muted-foreground italic mb-3">Provider: {service.provider}</p>
                <p className="text-sm text-card-foreground leading-relaxed mb-4">{service.description}</p>
                <a
                  href={service.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>🔗</span>
                  Открыть {service.name}
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Card>
            ))}
          </div>
        </section>

        {/* Databases Section */}
        <section className="bg-card rounded-xl shadow-2xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-primary mb-6 pb-3 border-b-4 border-primary">
            🗄️ Базы данных (TCP)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {databases.map((db) => (
              <Card
                key={db.name}
                className="p-5 bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900 dark:to-amber-800 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-l-4 border-orange-500"
              >
                <h3 className="text-xl font-bold text-card-foreground mb-2 flex items-center gap-2">
                  <span className="text-2xl">{db.icon}</span>
                  {db.name}
                </h3>
                <p className="text-xs text-muted-foreground italic mb-3">Provider: {db.provider}</p>
                <p className="text-sm text-card-foreground leading-relaxed mb-4">{db.description}</p>
                <div className="bg-white/70 dark:bg-black/30 rounded-md p-3 mb-4 text-sm space-y-1">
                  <div>
                    <strong className="text-card-foreground">Хост:</strong> {db.host}
                  </div>
                  <div>
                    <strong className="text-card-foreground">Порт:</strong>{" "}
                    <span className="inline-block bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold ml-1">
                      {db.port}
                    </span>
                  </div>
                  <div>
                    <strong className="text-card-foreground">Протокол:</strong> {db.protocol}
                  </div>
                  {db.additionalInfo && (
                    <div className="text-muted-foreground text-xs">{db.additionalInfo}</div>
                  )}
                </div>
                {/* <a
                  href={`tcp://${db.host}:${db.port}`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
                >
                  <span>🔗</span>
                  TCP подключение
                </a> */}
              </Card>
            ))}
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-white py-5 opacity-80">
          <p>© 2025 DE Infrastructure | Powered by Traefik & Docker</p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
