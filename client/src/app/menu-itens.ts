import { GroupComponent } from "./group/group.component";
import { UserComponent } from "./user/user.component";
import { SubgroupComponent } from "./subgroup/subgroup.component";
import { CollectionComponent } from "./collection/collection.component";
import { ProductComponent } from "./product/product.component";
import { ClientComponent } from "./client/client.component";
import { SaleComponent } from "./sale/sale.component";

export const MenuItens = [
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        component: UserComponent,
    } ,
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'supervisor_account',
        component: ClientComponent,
    },
    {
        path: 'group',
        caption : 'Grupo',
        icon : 'assessment',
        component: GroupComponent,
    },
    {
        path: 'subgroup',
        caption : 'Subgrupo',
        icon : 'assignment',
        component: SubgroupComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'next_week',
        component: CollectionComponent,
    },
    {
        path: 'product',
        caption : 'Produto',
        icon : 'folder_special',
        component: ProductComponent,
    },
    {
        path: 'sale',
        caption : 'Pedido de venda',
        icon : 'add_shopping_cart',
        component: SaleComponent,
    } 
]