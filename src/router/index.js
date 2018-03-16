import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Organization from '@/components/Organization'
import OrganizationEdit from '@/components/OrganizationEdit'
import ContactDetail from '@/components/ContactDetail'
import ContactDetailEdit from '@/components/ContactDetailEdit'
import Link from '@/components/Link'
import LinkEdit from '@/components/LinkEdit'
import Membership from '@/components/Membership'
import MembershipEdit from '@/components/MembershipEdit'
import Post from '@/components/Post'
import PostEdit from '@/components/PostEdit'
import EntityList from '@/components/EntityList'
import Citation from '@/components/Citation'
import CitationEdit from '@/components/CitationEdit'
import SubItemEntityList from '@/components/SubItemEntityList'
import Identifier from '@/components/Identifier'
import IdentifierEdit from '@/components/IdentifierEdit'
import OtherName from '@/components/OtherName'
import OtherNameEdit from '@/components/OtherNameEdit'
import CitationList from '@/components/CitationList'
import CitationFieldList from '@/components/CitationFieldList'
import BaseEntityCreate from '@/components/BaseEntityCreate'
import BaseEntityEdit from '@/components/BaseEntityEdit'
import personSchema from '../schema/person_form.json'

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
      component: Organization
    },
    {
      path: '/organizations/edit/:entity_id',
      name: 'OrganizationEdit',
      component: OrganizationEdit
    },
    {
      path: '/:entity/:entity_id/contact_details/create',
      name: 'ContactDetailsCreate',
      component: ContactDetail
    },
    {
      path: '/:entity/:entity_id/contact_details/edit/:contact_id',
      name: 'ContactDetailsEdit',
      component: ContactDetailEdit
    },
    {
      path: '/:entity/:entity_id/links/create',
      name: 'Links',
      component: Link
    },
    {
      path: '/:entity/:entity_id/links/edit/:link_id',
      name: 'LinksEdit',
      component: LinkEdit
    },
    {
      path: '/memberships/create',
      name: 'Membership',
      component: Membership
    },
    {
      path: '/memberships/edit/:entity_id',
      name: 'MembershipEdit',
      component: MembershipEdit
    },
    {
      path: '/posts/create',
      name: 'Post',
      component: Post
    },
    {
      path: '/posts/edit/:entity_id',
      name: 'PostEdit',
      component: PostEdit
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
      component: Identifier
    },
    {
      path: '/:entity/:entity_id/identifiers/edit/:identifier_id',
      name: 'IdentifierEdit',
      component: IdentifierEdit
    },
    {
      path: '/:entity/:entity_id/other_names/create',
      name: 'OtherNameCreate',
      component: OtherName
    },
    {
      path: '/:entity/:entity_id/other_names/edit/:other_name_id',
      name: 'OtherNameEdit',
      component: OtherNameEdit
    },
    {
      path: '/:entity/:entity_id/other_labels/create',
      name: 'OtherNameCreate',
      component: OtherName
    },
    {
      path: '/:entity/:entity_id/other_labels/edit/:other_name_id',
      name: 'OtherNameEdit',
      component: OtherNameEdit
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
