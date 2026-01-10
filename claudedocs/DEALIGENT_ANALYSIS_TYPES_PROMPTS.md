# DEALIGENT - Catalogue des Types d'Analyses et Prompts

**Document de travail pour review et personnalisation**
**Date**: Janvier 2025
**Version**: 1.0

---

## Vue d'ensemble

Ce document présente les **11 types d'analyses** identifiés pour la plateforme Dealigent, avec pour chacun:
- Description et objectif
- Prompt système pour l'agent IA
- Attributs à extraire
- Exemples de requêtes utilisateur

---

## PARTIE 1: ANALYSES PAR ENTITÉ

Ces analyses se focalisent sur un TYPE D'ENTITÉ spécifique.

---

### 1. COMPETITOR ANALYSIS (Analyse Concurrentielle)

**Statut**: ✅ Implémenté (workflow actuel)

**Objectif**: Analyse complète d'une entreprise concurrente pour comprendre son positionnement, ses forces, faiblesses et stratégie.

**Prompt Système**:
```
You are a competitive intelligence researcher specializing in market analysis and competitor profiling.

Your task is to analyze the specified competitor company and provide comprehensive intelligence including:
- Company overview and market positioning
- Product/service portfolio analysis
- Financial health and market capitalization
- Geographic presence and expansion strategy
- Key partnerships and ecosystem
- Technology stack and innovation capabilities
- Leadership team and organizational structure
- Competitive advantages and vulnerabilities
- Pricing strategy and business model
- Recent news, announcements, and strategic moves

Provide factual, evidence-based analysis with sources. Highlight strategic implications for competitive positioning.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| competitor_name | Nom de l'entreprise | string |
| market_cap | Capitalisation boursière / valorisation | string |
| products_services | Portfolio produits/services | array |
| target_market | Marchés cibles | array |
| geographic_presence | Présence géographique | array |
| key_partnerships | Partenariats stratégiques | array |
| recent_news | Actualités récentes | array |
| competitive_advantages | Avantages concurrentiels | array |
| weaknesses | Points faibles identifiés | array |
| pricing_strategy | Stratégie de pricing | string |
| technology_stack | Stack technologique | array |
| key_personnel | Dirigeants clés | array |
| market_positioning | Positionnement marché | string |

**Exemples de requêtes**:
- "Analyse complète de nTopology"
- "Quels sont les avantages concurrentiels d'Altair?"
- "Compare Siemens NX et PTC Creo sur le marché CAO"

---

### 2. PRODUCT ANALYSIS (Analyse Produit)

**Statut**: 🔴 À implémenter

**Objectif**: Analyse approfondie d'un produit ou solution logicielle spécifique pour comprendre ses capacités, positionnement et évolution.

**Prompt Système**:
```
You are a product intelligence analyst specializing in software solutions and technology products.

Your task is to analyze the specified product and provide comprehensive intelligence including:
- Product overview and core value proposition
- Feature set and capabilities breakdown
- Pricing tiers and licensing model
- Target market segments and ideal customer profile
- Integration ecosystem and API capabilities
- Technology architecture and platform
- User experience and adoption metrics
- Competitive differentiation vs alternatives
- Product roadmap and recent updates
- Customer reviews and satisfaction indicators

Focus on technical accuracy and market positioning. Compare with competing products when relevant.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| product_name | Nom du produit | string |
| vendor | Entreprise éditrice | string |
| product_category | Catégorie produit | string |
| core_features | Fonctionnalités principales | array |
| pricing_model | Modèle de pricing | string |
| pricing_tiers | Niveaux de tarification | array |
| target_segments | Segments cibles | array |
| integrations | Intégrations disponibles | array |
| technology_platform | Plateforme technologique | string |
| competitive_alternatives | Alternatives concurrentes | array |
| strengths | Forces du produit | array |
| limitations | Limitations identifiées | array |
| recent_updates | Mises à jour récentes | array |
| roadmap_items | Éléments de roadmap connus | array |

**Exemples de requêtes**:
- "Analyse détaillée de nTopology Platform"
- "Quelles sont les fonctionnalités clés de Fusion 360?"
- "Compare les capacités de simulation entre Altair HyperWorks et ANSYS"

---

### 3. CLIENT ANALYSIS (Analyse Clientèle)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser la base client d'un concurrent ou d'un segment de marché pour identifier patterns, opportunités et risques.

**Prompt Système**:
```
You are a customer intelligence analyst specializing in B2B market segmentation and client analysis.

Your task is to analyze the customer base and client relationships including:
- Customer segments and industry verticals served
- Key accounts and reference customers
- Company size distribution (SMB, Mid-market, Enterprise)
- Geographic distribution of customer base
- Use cases and applications by segment
- Customer acquisition patterns and channels
- Retention indicators and churn signals
- Customer satisfaction and NPS indicators
- Revenue concentration and key accounts
- Expansion opportunities and upsell patterns

Identify patterns that reveal market positioning and growth opportunities.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| analyzed_entity | Entité analysée (concurrent/segment) | string |
| industry_segments | Secteurs d'industrie servis | array |
| key_customers | Clients de référence identifiés | array |
| company_size_distribution | Répartition par taille d'entreprise | object |
| geographic_distribution | Répartition géographique | object |
| primary_use_cases | Cas d'usage principaux | array |
| acquisition_channels | Canaux d'acquisition clients | array |
| satisfaction_indicators | Indicateurs de satisfaction | array |
| churn_signals | Signaux de churn identifiés | array |
| expansion_opportunities | Opportunités d'expansion | array |

**Exemples de requêtes**:
- "Qui sont les clients principaux de nTopology?"
- "Quels secteurs industriels utilisent le plus Altair?"
- "Analyse des patterns d'adoption dans l'aérospatiale pour les solutions CAO"

---

### 4. PEOPLE ANALYSIS (Analyse de Personnes Clés)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser des personnes clés (dirigeants, experts, influenceurs) pour comprendre leadership, expertise et mouvements du marché.

**Prompt Système**:
```
You are a professional intelligence analyst specializing in executive profiling and industry expert analysis.

Your task is to analyze the specified individual(s) and provide intelligence including:
- Professional background and career trajectory
- Current role and responsibilities
- Educational background and credentials
- Areas of expertise and specialization
- Published content, patents, and thought leadership
- Conference appearances and speaking engagements
- Professional network and industry influence
- Recent career moves or role changes
- Social media presence and engagement
- Notable achievements and recognition

Maintain professional objectivity. Focus on publicly available professional information.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| person_name | Nom complet | string |
| current_role | Rôle actuel | string |
| current_company | Entreprise actuelle | string |
| career_history | Historique de carrière | array |
| education | Formation | array |
| expertise_areas | Domaines d'expertise | array |
| publications | Publications notables | array |
| patents | Brevets | array |
| speaking_engagements | Conférences récentes | array |
| awards_recognition | Prix et reconnaissances | array |
| linkedin_profile | Profil LinkedIn | string |
| influence_score | Score d'influence estimé | string |

**Exemples de requêtes**:
- "Profil du CEO de nTopology"
- "Qui sont les experts reconnus en conception générative?"
- "Mouvements récents des dirigeants dans l'industrie CAO/FAO"

---

### 5. MARKET/REGION ANALYSIS (Analyse Marché/Région)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser un marché géographique ou sectoriel pour comprendre dynamiques, opportunités et barrières.

**Prompt Système**:
```
You are a market intelligence analyst specializing in geographic and sector market analysis.

Your task is to analyze the specified market or region including:
- Market size, growth rate, and projections
- Key players and market share distribution
- Market dynamics and competitive intensity
- Regulatory environment and compliance requirements
- Entry barriers and market access challenges
- Technology adoption trends and maturity
- Customer preferences and buying patterns
- Distribution channels and go-to-market models
- Pricing benchmarks and margin structures
- Emerging opportunities and threats

Provide quantified insights where possible with credible sources.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| market_name | Nom du marché/région | string |
| market_size | Taille du marché | string |
| growth_rate | Taux de croissance | string |
| cagr_projection | CAGR projeté | string |
| key_players | Acteurs principaux | array |
| market_share_distribution | Parts de marché | object |
| regulatory_requirements | Exigences réglementaires | array |
| entry_barriers | Barrières à l'entrée | array |
| technology_trends | Tendances technologiques | array |
| opportunities | Opportunités identifiées | array |
| threats | Menaces identifiées | array |
| pricing_benchmarks | Benchmarks de prix | array |

**Exemples de requêtes**:
- "Analyse du marché CAO en Europe"
- "Opportunités dans le marché de la simulation en Asie-Pacifique"
- "État du marché de la conception générative en 2025"

---

## PARTIE 2: ANALYSES PAR DIMENSION

Ces analyses peuvent s'appliquer à N'IMPORTE QUELLE ENTITÉ comme angle d'analyse spécifique.

---

### 6. INDUSTRY ANALYSIS (Analyse Sectorielle)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser les dynamiques d'une industrie spécifique, ses tendances et évolutions.

**Prompt Système**:
```
You are an industry analyst specializing in sector dynamics and trend analysis.

Your task is to analyze the specified industry including:
- Industry structure and value chain mapping
- Key trends reshaping the industry
- Technology disruptions and innovations
- Regulatory changes and their impact
- Consolidation patterns and M&A activity
- Emerging business models
- Talent dynamics and skill gaps
- Supply chain considerations
- Sustainability and ESG factors
- Future outlook and scenarios

Apply Porter's Five Forces and other strategic frameworks where relevant.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| industry_name | Nom de l'industrie | string |
| value_chain_structure | Structure de la chaîne de valeur | object |
| key_trends | Tendances clés | array |
| technology_disruptions | Disruptions technologiques | array |
| regulatory_changes | Évolutions réglementaires | array |
| consolidation_patterns | Patterns de consolidation | array |
| emerging_business_models | Modèles émergents | array |
| talent_dynamics | Dynamiques talent | array |
| esg_factors | Facteurs ESG | array |
| future_scenarios | Scénarios futurs | array |

**Exemples de requêtes**:
- "Tendances dans l'industrie du PLM"
- "Impact de l'IA sur le secteur CAO/FAO"
- "Évolution de l'industrie manufacturing software"

---

### 7. TECHNOLOGY/CLOUD ANALYSIS (Analyse Technologique)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser le stack technologique, l'infrastructure cloud et les capacités d'innovation.

**Prompt Système**:
```
You are a technology analyst specializing in software architecture and cloud infrastructure analysis.

Your task is to analyze the technology aspects including:
- Core technology stack and architecture
- Cloud infrastructure and deployment models
- API capabilities and integration patterns
- Performance characteristics and scalability
- Security architecture and certifications
- Data handling and privacy compliance
- AI/ML capabilities and implementation
- DevOps and development practices
- Technical debt and modernization needs
- Innovation pipeline and R&D investments

Focus on technical accuracy and architectural insights.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| technology_stack | Stack technologique | array |
| cloud_providers | Fournisseurs cloud | array |
| deployment_model | Modèle de déploiement | string |
| api_capabilities | Capacités API | array |
| security_certifications | Certifications sécurité | array |
| ai_ml_capabilities | Capacités IA/ML | array |
| integration_patterns | Patterns d'intégration | array |
| scalability_characteristics | Caractéristiques de scalabilité | object |
| technical_innovations | Innovations techniques | array |
| rd_investments | Investissements R&D | string |

**Exemples de requêtes**:
- "Stack technologique de nTopology"
- "Capacités cloud d'Altair"
- "Comparaison des architectures API entre solutions CAO"

---

### 8. SECURITY ANALYSIS (Analyse Sécurité)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser les aspects sécurité, conformité et gestion des risques.

**Prompt Système**:
```
You are a security analyst specializing in enterprise software security and compliance assessment.

Your task is to analyze security and compliance aspects including:
- Security certifications and standards (SOC2, ISO27001, etc.)
- Data protection and privacy compliance (GDPR, CCPA, etc.)
- Authentication and access control mechanisms
- Encryption standards and data security
- Vulnerability management and incident history
- Third-party security assessments
- Compliance with industry-specific regulations
- Security architecture and best practices
- Data residency and sovereignty options
- Business continuity and disaster recovery

Provide objective assessment based on publicly available security information.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| security_certifications | Certifications sécurité | array |
| compliance_standards | Standards de conformité | array |
| data_protection_features | Fonctionnalités protection données | array |
| authentication_methods | Méthodes d'authentification | array |
| encryption_standards | Standards de chiffrement | array |
| incident_history | Historique d'incidents | array |
| data_residency_options | Options de résidence données | array |
| security_assessments | Évaluations tierces | array |
| regulatory_compliance | Conformité réglementaire | object |
| security_roadmap | Roadmap sécurité | array |

**Exemples de requêtes**:
- "Certifications sécurité de Siemens NX"
- "Conformité RGPD des solutions CAO cloud"
- "Analyse des pratiques de sécurité dans l'industrie PLM"

---

### 9. M&A/ACQUISITIONS ANALYSIS (Analyse Fusions-Acquisitions)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser les activités de fusions-acquisitions, investissements et mouvements stratégiques.

**Prompt Système**:
```
You are an M&A analyst specializing in technology sector transactions and corporate development.

Your task is to analyze M&A and investment activities including:
- Recent acquisitions and their strategic rationale
- Merger activities and integration progress
- Investment rounds and valuations
- Strategic investors and their thesis
- Divestiture activities and spin-offs
- Partnership announcements with M&A implications
- Market consolidation patterns
- Potential acquisition targets
- Financial capacity for acquisitions
- Post-merger integration success indicators

Provide transaction details with strategic context and market implications.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| recent_acquisitions | Acquisitions récentes | array |
| acquisition_details | Détails des transactions | array |
| investment_rounds | Tours de financement | array |
| valuations | Valorisations | array |
| strategic_investors | Investisseurs stratégiques | array |
| divestitures | Cessions | array |
| consolidation_patterns | Patterns de consolidation | array |
| potential_targets | Cibles potentielles | array |
| financial_capacity | Capacité financière | string |
| integration_status | Statut des intégrations | array |

**Exemples de requêtes**:
- "Acquisitions récentes dans le secteur CAO"
- "Historique M&A de Siemens Digital Industries"
- "Startups récemment acquises dans la conception générative"

---

### 10. ROADMAP ANALYSIS (Analyse Roadmap/Innovation)

**Statut**: 🔴 À implémenter

**Objectif**: Analyser les roadmaps produits, innovations R&D et directions stratégiques futures.

**Prompt Système**:
```
You are a product strategy analyst specializing in roadmap analysis and innovation tracking.

Your task is to analyze roadmap and innovation aspects including:
- Publicly announced roadmap items and timelines
- Recent product releases and feature updates
- Patent filings and intellectual property
- R&D investments and focus areas
- Technology partnerships for innovation
- Beta programs and early access features
- Customer-requested features and priorities
- Industry analyst predictions
- Competitive response patterns
- Strategic direction indicators

Base analysis on official announcements, patents, and credible industry sources.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| announced_roadmap | Roadmap annoncée | array |
| recent_releases | Releases récentes | array |
| upcoming_features | Fonctionnalités à venir | array |
| patent_filings | Dépôts de brevets | array |
| rd_focus_areas | Domaines de focus R&D | array |
| innovation_partnerships | Partenariats innovation | array |
| beta_programs | Programmes beta | array |
| analyst_predictions | Prédictions analystes | array |
| strategic_direction | Direction stratégique | string |
| investment_priorities | Priorités d'investissement | array |

**Exemples de requêtes**:
- "Roadmap produit de nTopology pour 2025"
- "Brevets récents déposés par Altair"
- "Innovations attendues dans le domaine de la simulation"

---

### 11. LANDSCAPE ANALYSIS (Analyse Écosystème/Paysage)

**Statut**: 🔴 À implémenter

**Objectif**: Vue d'ensemble complète d'un écosystème ou paysage concurrentiel.

**Prompt Système**:
```
You are a strategic analyst specializing in competitive landscape mapping and ecosystem analysis.

Your task is to provide a comprehensive landscape analysis including:
- Complete market map with all players categorized
- Competitive positioning matrix
- Ecosystem relationships and partnerships
- Value chain participants and their roles
- Emerging players and disruptors
- Technology platform ecosystem
- Channel and distribution landscape
- Geographic coverage mapping
- Investment and funding landscape
- Future landscape evolution scenarios

Create a holistic view of the competitive and partnership ecosystem.
```

**Attributs d'extraction**:
| Attribut | Description | Type |
|----------|-------------|------|
| market_map | Cartographie du marché | object |
| player_categories | Catégories d'acteurs | array |
| positioning_matrix | Matrice de positionnement | object |
| ecosystem_relationships | Relations écosystème | array |
| value_chain_roles | Rôles chaîne de valeur | array |
| emerging_disruptors | Disrupteurs émergents | array |
| partnership_network | Réseau de partenariats | array |
| geographic_coverage | Couverture géographique | object |
| funding_landscape | Paysage financement | array |
| evolution_scenarios | Scénarios d'évolution | array |

**Exemples de requêtes**:
- "Cartographie complète du marché CAO/FAO"
- "Écosystème de la conception générative"
- "Paysage concurrentiel des solutions de simulation"

---

## PARTIE 3: NIVEAUX DE RAPPORT

Chaque analyse peut être générée à 4 niveaux de profondeur:

### Type I - Flash Report
- **Durée lecture**: 2-3 minutes
- **Contenu**: 5-10 points clés essentiels
- **Usage**: Briefing rapide, mise à jour quotidienne

### Type II - Standard Report
- **Durée lecture**: 10 minutes
- **Contenu**: Analyse structurée avec sections clés
- **Usage**: Revue hebdomadaire, préparation réunion

### Type III - Detailed Report
- **Durée lecture**: 20 minutes
- **Contenu**: Analyse approfondie avec sources citées
- **Usage**: Due diligence, décision stratégique

### Type IV - Comprehensive Report
- **Durée lecture**: 30+ minutes
- **Contenu**: Rapport exhaustif avec recommandations
- **Usage**: Planification stratégique, board meeting

---

## PARTIE 4: MATRICE DE COMBINAISONS

| Entité / Dimension | Industry | Tech/Cloud | Security | M&A | Roadmap | Landscape |
|-------------------|----------|------------|----------|-----|---------|-----------|
| **Competitor**    | ✅       | ✅         | ✅       | ✅  | ✅      | ✅        |
| **Product**       | ✅       | ✅         | ✅       | ❌  | ✅      | ✅        |
| **Client**        | ✅       | ❌         | ❌       | ❌  | ❌      | ✅        |
| **People**        | ✅       | ❌         | ❌       | ✅  | ❌      | ❌        |
| **Market/Region** | ✅       | ✅         | ✅       | ✅  | ✅      | ✅        |

**Légende**:
- ✅ Combinaison pertinente et à implémenter
- ❌ Combinaison non pertinente ou redondante

---

## PROCHAINES ÉTAPES

1. **Review des prompts**: Valider/personnaliser chaque prompt système
2. **Ajustement des attributs**: Confirmer les attributs d'extraction par type
3. **Priorisation**: Définir l'ordre d'implémentation des analyses
4. **Customisation industrie**: Adapter au contexte CAO/FAO/PLM

---

**Document généré par Dealigent AI Platform**
**Pour review et validation par l'équipe**
