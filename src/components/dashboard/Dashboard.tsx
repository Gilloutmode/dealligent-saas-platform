"use client"

import * as React from "react"
import {
  TrendingUp,
  Building2,
  FileSearch,
  Clock,
  AlertCircle,
  Eye,
  Target,
  BarChart3,
  Sparkles,
  ChevronRight,
} from "lucide-react"

import { Button } from "../ui/Button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  StatCard,
} from "../ui/Card"
import { Badge, StatusBadge } from "../ui/Badge"
import { Avatar, AvatarGroup } from "../ui/Avatar"

// =============================================================================
// CDS PLATFORM - DASHBOARD COMPONENT
// Main dashboard view for Market Intelligence Platform
// Roles: Admin and Marketing versions
// =============================================================================

// =============================================================================
// TYPES
// =============================================================================

export interface DashboardProps {
  /** User role for conditional rendering */
  role?: "admin" | "marketing" | "sales" | "product" | "analyst"
  /** User's company name */
  companyName?: string
  /** Current user data */
  user?: {
    name: string
    email: string
    avatar?: string
  }
}

interface RecentAnalysis {
  id: string
  companyName: string
  type: "competitor" | "market" | "trend"
  status: "completed" | "pending" | "error"
  date: string
  score?: number
}

interface ActivityItem {
  id: string
  user: {
    name: string
    avatar?: string
  }
  action: string
  target: string
  time: string
}

// =============================================================================
// MOCK DATA
// =============================================================================

const mockStats = {
  totalAnalyses: 147,
  activeCompetitors: 23,
  marketTrends: 12,
  pendingValidations: 5,
  weeklyGrowth: 12.5,
  competitorGrowth: 8.3,
  trendGrowth: -2.1,
}

const mockRecentAnalyses: RecentAnalysis[] = [
  {
    id: "1",
    companyName: "TechCorp France",
    type: "competitor",
    status: "completed",
    date: "Il y a 2h",
    score: 87,
  },
  {
    id: "2",
    companyName: "InnovateSoft",
    type: "market",
    status: "completed",
    date: "Il y a 5h",
    score: 72,
  },
  {
    id: "3",
    companyName: "DataDriven Inc",
    type: "competitor",
    status: "pending",
    date: "Il y a 1j",
  },
  {
    id: "4",
    companyName: "CloudFirst",
    type: "trend",
    status: "error",
    date: "Il y a 2j",
  },
  {
    id: "5",
    companyName: "AI Solutions",
    type: "competitor",
    status: "completed",
    date: "Il y a 3j",
    score: 91,
  },
]

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    user: { name: "Marie Dupont" },
    action: "a lancé une analyse",
    target: "TechCorp France",
    time: "Il y a 2h",
  },
  {
    id: "2",
    user: { name: "Pierre Martin" },
    action: "a validé le rapport",
    target: "Tendances Q4 2025",
    time: "Il y a 4h",
  },
  {
    id: "3",
    user: { name: "Sophie Bernard" },
    action: "a ajouté un concurrent",
    target: "NewTech Solutions",
    time: "Il y a 6h",
  },
  {
    id: "4",
    user: { name: "Jean Leroy" },
    action: "a exporté le rapport",
    target: "Analyse Marché SaaS",
    time: "Il y a 1j",
  },
]

const mockTopCompetitors = [
  { name: "TechCorp", score: 92, trend: 5 },
  { name: "InnovateSoft", score: 87, trend: -2 },
  { name: "CloudFirst", score: 84, trend: 8 },
  { name: "DataDriven", score: 79, trend: 3 },
]

// =============================================================================
// DASHBOARD COMPONENT
// =============================================================================

export const Dashboard: React.FC<DashboardProps> = ({
  role = "marketing",
}) => {
  const isAdmin = role === "admin"

  return (
    <div className="p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">
            Tableau de bord
          </h1>
          <p className="text-gray-500 mt-1">
            Bienvenue, voici un aperçu de votre veille concurrentielle
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" leftIcon={<FileSearch className="h-4 w-4" />}>
            Voir les rapports
          </Button>
          <Button leftIcon={<Sparkles className="h-4 w-4" />}>
            Nouvelle analyse
          </Button>
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard
          label="Analyses totales"
          value={mockStats.totalAnalyses}
          trend={{ value: mockStats.weeklyGrowth, label: "vs semaine dernière" }}
          icon={<BarChart3 className="h-6 w-6" />}
          iconBg="blue"
        />
        <StatCard
          label="Concurrents suivis"
          value={mockStats.activeCompetitors}
          trend={{ value: mockStats.competitorGrowth, label: "ce mois" }}
          icon={<Building2 className="h-6 w-6" />}
          iconBg="violet"
        />
        <StatCard
          label="Tendances marché"
          value={mockStats.marketTrends}
          trend={{ value: mockStats.trendGrowth, label: "évolution" }}
          icon={<TrendingUp className="h-6 w-6" />}
          iconBg="emerald"
        />
        {isAdmin && (
          <StatCard
            label="Validations en attente"
            value={mockStats.pendingValidations}
            description="À traiter"
            icon={<Clock className="h-6 w-6" />}
            iconBg="amber"
          />
        )}
        {!isAdmin && (
          <StatCard
            label="Score moyen"
            value="85%"
            description="Qualité des analyses"
            icon={<Target className="h-6 w-6" />}
            iconBg="emerald"
          />
        )}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Analyses - Takes 2 columns */}
        <Card className="lg:col-span-2">
          <CardHeader
            action={
              <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                Voir tout
              </Button>
            }
          >
            <CardTitle>Analyses récentes</CardTitle>
            <CardDescription>
              Vos dernières analyses de veille concurrentielle
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockRecentAnalyses.map((analysis) => (
                <div
                  key={analysis.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2.5 rounded-lg ${
                        analysis.type === "competitor"
                          ? "bg-blue-100 text-blue-600"
                          : analysis.type === "market"
                          ? "bg-violet-100 text-violet-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {analysis.type === "competitor" ? (
                        <Building2 className="h-5 w-5" />
                      ) : analysis.type === "market" ? (
                        <BarChart3 className="h-5 w-5" />
                      ) : (
                        <TrendingUp className="h-5 w-5" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {analysis.companyName}
                      </p>
                      <p className="text-sm text-gray-500">{analysis.date}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {analysis.score && (
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {analysis.score}%
                        </p>
                        <p className="text-xs text-gray-500">Score</p>
                      </div>
                    )}
                    <StatusBadge
                      status={
                        analysis.status === "completed"
                          ? "completed"
                          : analysis.status === "pending"
                          ? "pending"
                          : "error"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Competitors */}
        <Card>
          <CardHeader
            action={
              <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                Détails
              </Button>
            }
          >
            <CardTitle>Top Concurrents</CardTitle>
            <CardDescription>Classement par score de menace</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTopCompetitors.map((competitor, index) => (
                <div
                  key={competitor.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold ${
                        index === 0
                          ? "bg-amber-100 text-amber-700"
                          : index === 1
                          ? "bg-gray-100 text-gray-600"
                          : index === 2
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-50 text-gray-500"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="font-medium text-gray-900">
                      {competitor.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-900">
                      {competitor.score}
                    </span>
                    <Badge
                      variant={competitor.trend >= 0 ? "success" : "destructive"}
                      size="sm"
                    >
                      {competitor.trend >= 0 ? "+" : ""}
                      {competitor.trend}%
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <Card className="lg:col-span-2">
          <CardHeader
            action={
              <Button variant="ghost" size="sm" rightIcon={<ChevronRight className="h-4 w-4" />}>
                Historique
              </Button>
            }
          >
            <CardTitle>Activité récente</CardTitle>
            <CardDescription>
              Les dernières actions de votre équipe
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockActivity.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                >
                  <Avatar name={item.user.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{item.user.name}</span>{" "}
                      {item.action}{" "}
                      <span className="font-medium text-primary">
                        {item.target}
                      </span>
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions rapides</CardTitle>
            <CardDescription>Accès direct aux fonctionnalités</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Sparkles className="h-4 w-4 text-primary" />}
              >
                Lancer une analyse IA
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Building2 className="h-4 w-4 text-violet-600" />}
              >
                Ajouter un concurrent
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<FileSearch className="h-4 w-4 text-emerald-600" />}
              >
                Générer un rapport
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                leftIcon={<Eye className="h-4 w-4 text-amber-600" />}
              >
                Consulter la watchlist
              </Button>
            </div>

            {/* Team Members Preview */}
            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium text-gray-700">Équipe active</p>
                <Badge variant="primary" size="sm">
                  4 en ligne
                </Badge>
              </div>
              <AvatarGroup size="sm" max={5}>
                <Avatar name="Marie Dupont" />
                <Avatar name="Pierre Martin" />
                <Avatar name="Sophie Bernard" />
                <Avatar name="Jean Leroy" />
                <Avatar name="Claire Moreau" />
                <Avatar name="Thomas Petit" />
              </AvatarGroup>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Admin Only Section */}
      {isAdmin && (
        <Card variant="outlined" className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-amber-900">
                Actions administrateur requises
              </CardTitle>
            </div>
            <CardDescription className="text-amber-700">
              {mockStats.pendingValidations} éléments nécessitent votre attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" size="sm">
                Valider les analyses ({mockStats.pendingValidations})
              </Button>
              <Button variant="outline" size="sm">
                Gérer les utilisateurs
              </Button>
              <Button variant="outline" size="sm">
                Configurer les sources RAG
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default Dashboard
