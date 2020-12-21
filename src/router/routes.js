import Welcome from "../pages/Welcome.vue";

import CausasEndocrinas from "../pages/CausasEndocrinas.vue";
import CausasEndocrinasCurso from "../pages/CausasEndocrinasCurso.vue";
import CausasEndocrinasAula1 from "../components/CausasEndocrinasAula1.vue";
import CausasEndocrinasCertificado from "../components/CausasEndocrinasCertificado.vue";

import CursosNutri from "../pages/CursosNutri.vue";
import CursosTodos from "../pages/CursosTodos.vue";
import CursosFranq from "../pages/CursosFranq.vue";

import ConfeitariaFuncional from "../pages/ConfeitariaFuncional.vue";
import ConfeitariaFuncionalCurso from "../pages/ConfeitariaFuncionalCurso.vue";
import ConfeitariaFuncionalAula1 from "../components/ConfeitariaFuncionalAula1.vue";
import ConfeitariaFuncionalAula2 from "../components/ConfeitariaFuncionalAula2.vue";
import ConfeitariaFuncionalCertificado from "../components/ConfeitariaFuncionalCertificado.vue";

import HipnoseClinica from "../pages/HipnoseClinica.vue";
import HipnoseClinicaCurso from "../pages/HipnoseClinicaCurso.vue";
import HipnoseClinicaAula1 from "../components/HipnoseClinicaAula1.vue";
import HipnoseClinicaApostila from "../components/HipnoseClinicaApostila.vue";
import HipnoseClinicaEbook from "../components/HipnoseClinicaEbook.vue";
import HipnoseClinicaBalao from "../components/HipnoseClinicaBalao.vue";
import HipnoseClinicaCertificado from "../components/HipnoseClinicaCertificado.vue";

import BasicSemana from "../pages/BasicSemana.vue";
import BasicSemanaCurso from "../pages/BasicSemanaCurso.vue";
import BasicSemanaAula1 from "../components/BasicSemanaAula1.vue";
import BasicSemanaAula2 from "../components/BasicSemanaAula2.vue";
import BasicSemanaAula3 from "../components/BasicSemanaAula3.vue";
import BasicSemanaAula4 from "../components/BasicSemanaAula4.vue";
import BasicSemanaAula5 from "../components/BasicSemanaAula5.vue";
import BasicSemanaAula6 from "../components/BasicSemanaAula6.vue";
import BasicSemanaAula7 from "../components/BasicSemanaAula7.vue";
import BasicSemanaAula8 from "../components/BasicSemanaAula8.vue";
import BasicSemanaCertificado from "../components/BasicSemanaCertificado.vue";

import TranstornosAlimentares from "../pages/TranstornosAlimentares.vue";
import TranstornosAlimentaresCurso from "../pages/TranstornosAlimentaresCurso.vue";
import TranstornosAlimentaresAula1 from "../components/TranstornosAlimentaresAula1.vue";
import TranstornosAlimentaresAula2 from "../components/TranstornosAlimentaresAula2.vue";
import TranstornosAlimentaresCertificado from "../components/TranstornosAlimentaresCertificado.vue";

import NutricaoEsportiva from "../pages/NutricaoEsportiva.vue";
import NutricaoEsportivaCurso from "../pages/NutricaoEsportivaCurso.vue";
import NutricaoEsportivaAula1 from "../components/NutricaoEsportivaAula1.vue";
import NutricaoEsportivaCertificado from "../components/NutricaoEsportivaCertificado.vue";

import MindfulEating from "../pages/MindfulEating.vue";
import MindfulEatingCurso from "../pages/MindfulEatingCurso.vue";
import MindfulEatingAula1 from "../components/MindfulEatingAula1.vue";
import MindfulEatingCertificado from "../components/MindfulEatingCertificado.vue";

import NutricaoRenal from "../pages/NutricaoRenal.vue";
import NutricaoRenalCurso from "../pages/NutricaoRenalCurso.vue";
import NutricaoRenalAula1 from "../components/NutricaoRenalAula1.vue";
import NutricaoRenalCertificado from "../components/NutricaoRenalCertificado.vue";

import WorkshopDecolaNutri from "../components/WorkshopDecolaNutri.vue";
import WorkshopDecolaNutriCurso from "../pages/WorkshopDecolaNutriCurso.vue";
import WorkshopDecolaNutriAula1 from "../components/WorkshopDecolaNutriAula1.vue";
import WorkshopDecolaNutriAula2 from "../components/WorkshopDecolaNutriAula2.vue";
import WorkshopDecolaNutriAula3 from "../components/WorkshopDecolaNutriAula3.vue";

import EbookProcrastinacao from "../components/EbookProcrastinacao.vue";

import MeusCursos from "../pages/MeusCursos.vue";

export default [
  {
    path: "/",
    component: Welcome
  },
  {
    path: "/CursosNutri",
    component: CursosNutri
  },
  {
    path: "/CursosTodos",
    component: CursosTodos
  },
  {
    path: "/CursosFranq",
    component: CursosFranq
  },
  {
    path: "/CausasEndocrinas",
    component: CausasEndocrinas
  },
  {
    path: "/WorkshopDecolaNutri",
    component: WorkshopDecolaNutri
  },
  {
    path: "/Workshop-Decola-Nutri-Curso",
    component: WorkshopDecolaNutriCurso,
    children: [
      {
        path: "/WorkshopDecolaNutriAula1",
        name: "WorkshopDecolaNutriAula1",
        component: WorkshopDecolaNutriAula1
      },
      {
        path: "/WorkshopDecolaNutriAula2",
        name: "WorkshopDecolaNutriAula2",
        component: WorkshopDecolaNutriAula2
      },
      {
        path: "/WorkshopDecolaNutriAula3",
        name: "WorkshopDecolaNutriAula3",
        component: WorkshopDecolaNutriAula3
      },            
      {
        path: "/EbookProcrastinacao",
        name: "EbookProcrastinacao",
        component: EbookProcrastinacao
      }
    ]
  },
  {
    path: "/Curso-Causas-endocrinas-da-obesidade",
    component: CausasEndocrinasCurso,
    children: [
      {
        path: "/CausasEndocrinasAula1",
        name: "CausasEndocrinasAula1",
        component: CausasEndocrinasAula1
      },
      {
        path: "/CausasEndocrinasCertificado",
        name: "CausasEndocrinasCertificado",
        component: CausasEndocrinasCertificado
      }
    ]
  },
  {
    path: "/ConfeitariaFuncional",
    component: ConfeitariaFuncional
  },
  {
    path: "/Curso-Confeitaria-funcional",
    component: ConfeitariaFuncionalCurso,
    children: [
      {
        path: "/ConfeitariaFuncionalAula1",
        name: "ConfeitariaFuncionalAula1",
        component: ConfeitariaFuncionalAula1
      },
      {
        path: "/ConfeitariaFuncionalAula2",
        name: "ConfeitariaFuncionalAula2",
        component: ConfeitariaFuncionalAula2
      },      
      {
        path: "/ConfeitariaFuncionalCertificado",
        name: "ConfeitariaFuncionalCertificado",
        component: ConfeitariaFuncionalCertificado
      }
    ]
  },  
  {
    path: "/HipnoseClinica",
    component: HipnoseClinica
  },
  {
    path: "/Curso-Hipnose-clinica",
    component: HipnoseClinicaCurso,
    children: [
      {
        path: "/HipnoseClinicaAula1",
        name: "HipnoseClinicaAula1",
        component: HipnoseClinicaAula1
      },  
      {
        path: "/HipnoseClinicaApostila",
        name: "HipnoseClinicaApostila",
        component: HipnoseClinicaApostila
      },  
      {
        path: "/HipnoseClinicaEbook",
        name: "HipnoseClinicaEbook",
        component: HipnoseClinicaEbook
      }, 
      {
        path: "/HipnoseClinicaBalao",
        name: "HipnoseClinicaBalao",
        component: HipnoseClinicaBalao
      },                      
      {
        path: "/HipnoseClinicaCertificado",
        name: "HipnoseClinicaCertificado",
        component: HipnoseClinicaCertificado
      }
    ]
  },   
  {
    path: "/NutricaoRenal",
    component: NutricaoRenal
  },
  {
    path: "/Curso-Nutricao-renal",
    component: NutricaoRenalCurso,
    children: [
      {
        path: "/NutricaoRenalAula1",
        name: "NutricaoRenalAula1",
        component: NutricaoRenalAula1
      },
      {
        path: "/NutricaoRenalCertificado",
        name: "NutricaoRenalCertificado",
        component: NutricaoRenalCertificado
      }
    ]
  },
  {
    path: "/MindfulEating",
    component: MindfulEating
  },
  {
    path: "/Curso-Mindful-eating",
    component: MindfulEatingCurso,
    children: [
      {
        path: "/MindfulEatingAula1",
        name: "MindfulEatingAula1",
        component: MindfulEatingAula1
      },
      {
        path: "/MindfulEatingCertificado",
        name: "MindfulEatingCertificado",
        component: MindfulEatingCertificado
      }
    ]
  },  
  {
    path: "/NutricaoEsportiva",
    component: NutricaoEsportiva
  },
  {
    path: "/Curso-Nutricao-esportiva",
    component: NutricaoEsportivaCurso,
    children: [
      {
        path: "/NutricaoEsportivaAula1",
        name: "NutricaoEsportivaAula1",
        component: NutricaoEsportivaAula1
      },
      {
        path: "/NutricaoEsportivaCertificado",
        name: "NutricaoEsportivaCertificado",
        component: NutricaoEsportivaCertificado
      }
    ]
  },  
  {
    path: "/BasicSemana",
    component: BasicSemana
  },
  {
    path: "/Curso-Basis-semana",
    component: BasicSemanaCurso,
    children: [
      {
        path: "/BasicSemanaAula1",
        name: "BasicSemanaAula1",
        component: BasicSemanaAula1
      },
      {
        path: "/BasicSemanaAula2",
        name: "BasicSemanaAula2",
        component: BasicSemanaAula2
      },
      {
        path: "/BasicSemanaAula3",
        name: "BasicSemanaAula3",
        component: BasicSemanaAula3
      },
      {
        path: "/BasicSemanaAula4",
        name: "BasicSemanaAula4",
        component: BasicSemanaAula4
      },
      {
        path: "/BasicSemanaAula5",
        name: "BasicSemanaAula5",
        component: BasicSemanaAula5
      },
      {
        path: "/BasicSemanaAula6",
        name: "BasicSemanaAula6",
        component: BasicSemanaAula6
      },   
      {
        path: "/BasicSemanaAula7",
        name: "BasicSemanaAula7",
        component: BasicSemanaAula7
      },                        
      {
        path: "/BasicSemanaAula8",
        name: "BasicSemanaAula8",
        component: BasicSemanaAula8
      },   
      {
        path: "/BasicSemanaCertificado",
        name: "BasicSemanaCertificado",
        component: BasicSemanaCertificado
      }
    ]
  },
  {
    path: "/TranstornosAlimentares",
    component: TranstornosAlimentares,
  },
  {
    path: "/Curso-Transtornos-alimentares",
    component: TranstornosAlimentaresCurso,
    children: [
      {
        path: "/TranstornosAlimentaresAula1",
        name: "TranstornosAlimentaresAula1",
        component: TranstornosAlimentaresAula1
      },
      {
        path: "/TranstornosAlimentaresAula2",
        name: "TranstornosAlimentaresAula2",
        component: TranstornosAlimentaresAula2
      },      
      {
        path: "/TranstornosAlimentaresCertificado",
        name: "TranstornosAlimentaresCertificado",
        component: TranstornosAlimentaresCertificado
      }
    ]
  }, 
  {
    path: "/MeusCursos",
    component: MeusCursos
  }
];
