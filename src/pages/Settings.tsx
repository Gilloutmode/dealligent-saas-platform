import { motion } from 'framer-motion'
import {
  User,
  Lock,
  Bell,
  Palette,
  Globe,
  CreditCard,
  Users,
  Shield,
  Key,
  Mail,
  Smartphone,
  Moon,
  Sun,
  Monitor,
  Check,
  ChevronRight,
  Upload,
} from 'lucide-react'
import { useState } from 'react'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
}

const settingSections = [
  { id: 'profile', label: 'Profil', icon: <User className="w-5 h-5" /> },
  { id: 'security', label: 'Sécurité', icon: <Lock className="w-5 h-5" /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell className="w-5 h-5" /> },
  { id: 'appearance', label: 'Apparence', icon: <Palette className="w-5 h-5" /> },
  { id: 'integrations', label: 'Intégrations', icon: <Globe className="w-5 h-5" /> },
  { id: 'billing', label: 'Facturation', icon: <CreditCard className="w-5 h-5" /> },
  { id: 'team', label: 'Équipe', icon: <Users className="w-5 h-5" /> },
]

export function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile')
  const [theme, setTheme] = useState<'light' | 'dark' | 'system'>('light')

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-8 space-y-6"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-muted-foreground">
          Gérez votre compte et vos préférences
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar */}
        <motion.div variants={itemVariants} className="lg:w-64 flex-shrink-0">
          <div className="glass-card p-2 space-y-1">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeSection === section.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg'
                    : 'hover:bg-white/60 text-muted-foreground hover:text-foreground'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Content */}
        <div className="flex-1 space-y-6">
          {/* Profile Section */}
          {activeSection === 'profile' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Informations personnelles</h2>

                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                      JD
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                      <Upload className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Jean Dupont</h3>
                    <p className="text-muted-foreground">Administrateur</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Prénom</label>
                    <input type="text" defaultValue="Jean" className="input-glass" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nom</label>
                    <input type="text" defaultValue="Dupont" className="input-glass" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input type="email" defaultValue="jean.dupont@entreprise.com" className="input-glass" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Téléphone</label>
                    <input type="tel" defaultValue="+33 6 12 34 56 78" className="input-glass" />
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <button className="btn-gradient">Sauvegarder</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Section */}
          {activeSection === 'security' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Mot de passe</h2>
                <div className="space-y-4 max-w-md">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Mot de passe actuel</label>
                    <input type="password" className="input-glass" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nouveau mot de passe</label>
                    <input type="password" className="input-glass" placeholder="••••••••" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Confirmer le nouveau mot de passe</label>
                    <input type="password" className="input-glass" placeholder="••••••••" />
                  </div>
                  <button className="btn-gradient">Mettre à jour</button>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Authentification à deux facteurs</h2>
                <div className="flex items-center justify-between p-4 rounded-xl glass-card-light">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      <Shield className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">2FA activée</h4>
                      <p className="text-sm text-muted-foreground">Via application d'authentification</p>
                    </div>
                  </div>
                  <span className="badge-success">Actif</span>
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Sessions actives</h2>
                <div className="space-y-3">
                  {[
                    { device: 'MacBook Pro', location: 'Paris, France', current: true },
                    { device: 'iPhone 15', location: 'Paris, France', current: false },
                    { device: 'Chrome on Windows', location: 'Lyon, France', current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl glass-card-light">
                      <div className="flex items-center gap-4">
                        <Monitor className="w-5 h-5 text-muted-foreground" />
                        <div>
                          <h4 className="font-medium">{session.device}</h4>
                          <p className="text-sm text-muted-foreground">{session.location}</p>
                        </div>
                      </div>
                      {session.current ? (
                        <span className="badge-glass">Session actuelle</span>
                      ) : (
                        <button className="text-sm text-red-600 hover:underline">Déconnecter</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Notifications Section */}
          {activeSection === 'notifications' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Préférences de notification</h2>

                <div className="space-y-4">
                  {[
                    { label: 'Alertes par email', desc: 'Recevoir les alertes importantes par email', icon: <Mail className="w-5 h-5" /> },
                    { label: 'Notifications push', desc: 'Notifications sur votre appareil', icon: <Smartphone className="w-5 h-5" /> },
                    { label: 'Résumé hebdomadaire', desc: 'Recevoir un résumé chaque semaine', icon: <Bell className="w-5 h-5" /> },
                    { label: 'Alertes concurrentielles', desc: 'Alertes sur vos concurrents surveillés', icon: <Shield className="w-5 h-5" /> },
                  ].map((notif, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl glass-card-light">
                      <div className="flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                          {notif.icon}
                        </div>
                        <div>
                          <h4 className="font-medium">{notif.label}</h4>
                          <p className="text-sm text-muted-foreground">{notif.desc}</p>
                        </div>
                      </div>
                      <button className="w-12 h-7 rounded-full bg-primary transition-colors relative">
                        <div className="absolute top-1 translate-x-6 w-5 h-5 rounded-full bg-white shadow" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Appearance Section */}
          {activeSection === 'appearance' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Thème</h2>

                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'light', label: 'Clair', icon: <Sun className="w-6 h-6" /> },
                    { id: 'dark', label: 'Sombre', icon: <Moon className="w-6 h-6" /> },
                    { id: 'system', label: 'Système', icon: <Monitor className="w-6 h-6" /> },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTheme(t.id as typeof theme)}
                      className={`p-6 rounded-2xl text-center transition-all ${
                        theme === t.id
                          ? 'glass-card ring-2 ring-primary shadow-lg'
                          : 'glass-card-light hover:bg-white/60'
                      }`}
                    >
                      <div className={`mb-3 mx-auto w-12 h-12 rounded-xl flex items-center justify-center ${
                        theme === t.id
                          ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white'
                          : 'bg-gray-100 text-muted-foreground'
                      }`}>
                        {t.icon}
                      </div>
                      <span className="font-medium">{t.label}</span>
                      {theme === t.id && (
                        <Check className="w-5 h-5 text-primary mx-auto mt-2" />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Langue et région</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Langue</label>
                    <select className="input-glass">
                      <option>Français</option>
                      <option>English</option>
                      <option>Deutsch</option>
                      <option>Español</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Fuseau horaire</label>
                    <select className="input-glass">
                      <option>Europe/Paris (UTC+1)</option>
                      <option>Europe/London (UTC+0)</option>
                      <option>America/New_York (UTC-5)</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Integrations Section */}
          {activeSection === 'integrations' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Intégrations connectées</h2>

                <div className="space-y-4">
                  {[
                    { name: 'Slack', desc: 'Recevez des alertes dans Slack', connected: true },
                    { name: 'Google Workspace', desc: 'Synchronisez avec Google', connected: true },
                    { name: 'Microsoft 365', desc: 'Intégration Microsoft', connected: false },
                    { name: 'Salesforce', desc: 'Synchronisez vos données CRM', connected: false },
                  ].map((integration, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl glass-card-light">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {integration.name.charAt(0)}
                        </div>
                        <div>
                          <h4 className="font-medium">{integration.name}</h4>
                          <p className="text-sm text-muted-foreground">{integration.desc}</p>
                        </div>
                      </div>
                      {integration.connected ? (
                        <span className="badge-success">Connecté</span>
                      ) : (
                        <button className="btn-glass text-sm">Connecter</button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Clés API</h2>

                <div className="flex items-center gap-4 p-4 rounded-xl glass-card-light mb-4">
                  <Key className="w-5 h-5 text-muted-foreground" />
                  <div className="flex-1">
                    <code className="text-sm">sk-cds-****************************</code>
                    <p className="text-xs text-muted-foreground mt-1">Créée le 15 déc. 2025</p>
                  </div>
                  <button className="text-sm text-red-600 hover:underline">Révoquer</button>
                </div>

                <button className="btn-glass text-sm">
                  + Générer une nouvelle clé API
                </button>
              </div>
            </motion.div>
          )}

          {/* Billing Section */}
          {activeSection === 'billing' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-lg font-semibold">Plan actuel</h2>
                    <p className="text-muted-foreground">Vous êtes sur le plan Premium</p>
                  </div>
                  <span className="badge-gradient px-4 py-2">Premium</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 rounded-xl glass-card-light">
                    <p className="text-sm text-muted-foreground">Analyses/mois</p>
                    <p className="text-2xl font-bold">47/100</p>
                  </div>
                  <div className="p-4 rounded-xl glass-card-light">
                    <p className="text-sm text-muted-foreground">Concurrents</p>
                    <p className="text-2xl font-bold">12/25</p>
                  </div>
                  <div className="p-4 rounded-xl glass-card-light">
                    <p className="text-sm text-muted-foreground">Utilisateurs</p>
                    <p className="text-2xl font-bold">5/10</p>
                  </div>
                </div>

                <button className="btn-gradient">Changer de plan</button>
              </div>

              <div className="glass-card p-6">
                <h2 className="text-lg font-semibold mb-6">Moyen de paiement</h2>

                <div className="flex items-center gap-4 p-4 rounded-xl glass-card-light">
                  <CreditCard className="w-8 h-8 text-muted-foreground" />
                  <div>
                    <h4 className="font-medium">•••• •••• •••• 4242</h4>
                    <p className="text-sm text-muted-foreground">Expire 12/26</p>
                  </div>
                  <button className="ml-auto text-sm text-primary hover:underline">Modifier</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* Team Section */}
          {activeSection === 'team' && (
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="glass-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Membres de l'équipe</h2>
                  <button className="btn-gradient text-sm">Inviter un membre</button>
                </div>

                <div className="space-y-3">
                  {[
                    { name: 'Jean Dupont', email: 'jean.dupont@entreprise.com', role: 'Admin' },
                    { name: 'Marie Martin', email: 'marie.martin@entreprise.com', role: 'Éditeur' },
                    { name: 'Pierre Durand', email: 'pierre.durand@entreprise.com', role: 'Lecteur' },
                  ].map((member, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-xl glass-card-light">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <h4 className="font-medium">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="badge-glass">{member.role}</span>
                        <button className="text-sm text-muted-foreground hover:text-foreground">
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default SettingsPage
