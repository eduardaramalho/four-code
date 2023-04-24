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
        permissao : [1],
        component: UserComponent,
    } ,
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'supervisor_account',
        permissao : [1, 2],
        component: ClientComponent,
    },
    {
        path: 'group',
        caption : 'Grupo',
        icon : 'assessment',
        permissao : [1, 2],
        component: GroupComponent,
    },
    {
        path: 'subgroup',
        caption : 'Subgrupo',
        icon : 'assignment',
        permissao : [1, 2],
        component: SubgroupComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'next_week',
        permissao : [1, 2],
        component: CollectionComponent,
    },
    {
        path: 'product',
        caption : 'Produto',
        icon : 'folder_special',
        permissao : [1, 2, 3],
        component: ProductComponent,
    },
    {
        path: 'sale',
        caption : 'Pedido de venda',
        icon : 'add_shopping_cart',
        permissao : [1, 4],
        component: SaleComponent,
    },
    {
        path: 'frete',
        caption: 'Cálculo de fretes',
        icon: 'add_shopping_cart',
        permissao: [4],
        component: SaleComponent,
    }
]