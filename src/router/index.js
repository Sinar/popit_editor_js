import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import EntityList from '@/components/EntityList'
import Citation from '@/components/Citation'
import CitationEdit from '@/components/CitationEdit'
import SubItemEntityList from '@/components/SubItemEntityList'
import CitationList from '@/components/CitationList'
import CitationFieldList from '@/components/CitationFieldList'
import BaseEntityCreate from '@/components/BaseEntityCreate'
import BaseEntityEdit from '@/components/BaseEntityEdit'
import personSchema from '../schema/person_form.json'
import organizationSchema from '../schema/organization_form.json'
import membershipSchema from '../schema/membership_form.json'
import postSchema from '../schema/post_form.json'
import BaseSubEntityCreate from '@/components/BaseSubEntityCreate'
import BaseSubEntityEdit from '@/components/BaseSubEntityEdit'
import contactDetailSchema from '../schema/contact_detail_form.json'
import linkSchema from '../schema/link_form.json'
import otherNameSchema from '../schema/other_name_form.json'
import identifierSchema from '../schema/identifier_form.json'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'LandingPage',
      component: LandingPage
    },
    {
      path: '/persons/create',
      name: 'Person',
      component: BaseEntityCreate,
      props: {
        schema: personSchema,
        entities: 'persons'
      }
    },
    {
      path: '/persons/edit/:entity_id',
      name: 'PersonEdit',
      component: BaseEntityEdit,
      props: {
        schema: personSchema,
        entity: 'persons',
        hasOtherName: true,
        hasIdentifier: true,
        hasContact: true
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/logout',
      name: 'Logout',
      component: Logout
    },
    {
      path: '/organizations/create',
      name: 'Organization',
      component: BaseEntityCreate,
      props: {
        schema: organizationSchema,
        entities: 'organizations'
      }
    },
    {
      path: '/organizations/edit/:entity_id',
      name: 'OrganizationEdit',
      component: BaseEntityEdit,
      props: {
        schema: organizationSchema,
        entity: 'organizations',
        hasContact: true,
        hasIdentifier: true,
        hasOtherName: true
      }
    },
    {
      path: '/:entity/:entity_id/contact_details/create',
      name: 'ContactDetailsCreate',
      component: BaseSubEntityCreate,
      props: {
        schema: contactDetailSchema,
        subEntity: 'contact_details'
      }
    },
    {
      path: '/:entity/:entity_id/contact_details/edit/:subentity_id',
      name: 'ContactDetailsEdit',
      component: BaseSubEntityEdit,
      props: {
        schema: contactDetailSchema,
        subEntity: 'contact_details'
      }
    },
    {
      path: '/:entity/:entity_id/links/create',
      name: 'Links',
      component: BaseSubEntityCreate,
      props: {
        schema: linkSchema,
        subEntity: 'links'
      }
    },
    {
      path: '/:entity/:entity_id/links/edit/:subentity_id',
      name: 'LinksEdit',
      component: BaseSubEntityEdit,
      props: {
        schema: linkSchema,
        subEntity: 'links'
      }
    },
    {
      path: '/memberships/create',
      name: 'Membership',
      component: BaseEntityCreate,
      props: {
        schema: membershipSchema,
        entities: 'memberships'
      }
    },
    {
      path: '/memberships/edit/:entity_id',
      name: 'MembershipEdit',
      component: BaseEntityEdit,
      props: {
        schema: membershipSchema,
        entity: 'memberships',
        hasContact: true
      }
    },
    {
      path: '/posts/create',
      name: 'Post',
      component: BaseEntityCreate,
      props: {
        schema: postSchema,
        entities: 'posts'
      }
    },
    {
      path: '/posts/edit/:entity_id',
      name: 'PostEdit',
      component: BaseEntityEdit,
      props: {
        schema: postSchema,
        entity: 'posts',
        hasContact: true
      }
    },
    {
      path: '/:entity/list',
      name: 'EntityList',
      component: EntityList
    },
    {
      path: '/:entity/:entity_id/citations/:field/create',
      name: 'Citation',
      component: Citation
    },
    {
      path: '/:entity/:entity_id/citations/:field/edit/:citation_id',
      name: 'CitationEdit',
      component: CitationEdit
    },
    {
      path: '/:entity/:entity_id/:sub_entity/list',
      name: 'SubItemEntityList',
      component: SubItemEntityList
    },
    {
      path: '/:entity/:entity_id/identifiers/create',
      name: 'IdentifierCreate',
      component: BaseSubEntityCreate,
      props: {
        schema: identifierSchema,
        subEntity: 'identifiers'
      }
    },
    {
      path: '/:entity/:entity_id/identifiers/edit/:subentity_id',
      name: 'IdentifierEdit',
      component: BaseSubEntityEdit,
      props: {
        schema: identifierSchema,
        subEntity: 'identifiers'
      }
    },
    {
      path: '/:entity/:entity_id/other_names/create',
      name: 'OtherNameCreate',
      component: BaseSubEntityCreate,
      props: {
        schema: otherNameSchema,
        subEntity: 'other_names'
      }
    },
    {
      path: '/:entity/:entity_id/other_names/edit/:subentity_id',
      name: 'OtherNameEdit',
      component: BaseEntityEdit,
      props: {
        schema: otherNameSchema,
        subEntity: 'other_names'
      }
    },
    {
      path: '/:entity/:entity_id/citations/:field/list/',
      name: 'CitationList',
      component: CitationList
    },
    {
      path: '/:entity/:entity_id/citations/',
      name: 'CitationFieldList',
      component: CitationFieldList
    }
  ]
})
