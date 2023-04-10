import { GroupComponent } from "./group/group.component";
import { UserComponent } from "./user/user.component";
import { SubgroupComponent } from "./subgroup/subgroup.component";
import { CollectionComponent } from "./collection/collection.component";
import { ProductComponent } from "./product/product.component";
import { ClientComponent } from "./client/client.component";
import { SaleComponent } from "./sale/sale.component";
import { Role } from "./_models/role";
import { AuthGuard } from "./_helpers";

export const MenuItens = [
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        component: UserComponent,
        // canActivate: [AuthGuard],
        data: { roles: [Role.Admin]}
    } ,
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'supervisor_account',
        component: ClientComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'group',
        caption : 'Grupo',
        icon : 'assessment',
        component: GroupComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'subgroup',
        caption : 'Subgrupo',
        icon : 'assignment',
        component: SubgroupComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'next_week',
        component: CollectionComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'product',
        caption : 'Produto',
        icon : 'folder_special',
        component: ProductComponent,
        // canActivate: [AuthGuard]
    },
    {
        path: 'sale',
        caption : 'Pedido de venda',
        icon : 'add_shopping_cart',
        component: SaleComponent,
        // canActivate: [AuthGuard]
    }
]