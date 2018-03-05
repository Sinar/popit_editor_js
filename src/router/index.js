import Vue from 'vue'
import Router from 'vue-router'
import LandingPage from '@/components/LandingPage'
import Person from '@/components/Person'
import PersonEdit from '@/components/PersonEdit'
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
      component: Person
    },
    {
      path: '/persons/edit/:entity_id',
      name: 'PersonEdit',
      component: PersonEdit
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
      path: '/:entity/:entity_id/contact_details',
      name: 'ContactDetailsCreate',
      component: ContactDetail
    },
    {
      path: '/:entity/:entity_id/contact_details/edit/:contact_id',
      name: 'ContactDetailsEdit',
      component: ContactDetailEdit
    },
    {
      path: '/:entity/:entity_id/links',
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
      path: '/:entity/:entity_id/citations/:field',
      name: 'Citation',
      component: Citation
    },
    {
      path: '/:entity/:entity+id/citations/:field/:citation_id',
      name: 'CitationEdit',
      component: CitationEdit
    }
  ]
})
