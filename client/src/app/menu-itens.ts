import { GroupComponent } from "./group/group.component";
import { UserComponent } from "./user/user.component";
import { SubgroupComponent } from "./subgroup/subgroup.component";
import { CollectionComponent } from "./collection/collection.component";
import { ProductComponent } from "./product/product.component";
import { ClientComponent } from "./client/client.component";
import { SaleComponent } from "./sale/sale.component";
import { ChargeCarryingComponent } from "./charge-carrying/charge-carrying.component";

export const MenuItens = [
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'person',
        permissao : [4],
        component: UserComponent,
    } ,
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'supervisor_account',
        permissao : [4],
        component: ClientComponent,
    },
    {
        path: 'group',
        caption : 'Grupo',
        icon : 'assessment',
        permissao : [4],
        component: GroupComponent,
    },
    {
        path: 'subgroup',
        caption : 'Subgrupo',
        icon : 'assignment',
        permissao : [4],
        component: SubgroupComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'next_week',
        permissao : [4],
        component: CollectionComponent,
    },
    {
        path: 'product',
        caption : 'Produto',
        icon : 'folder_special',
        permissao : [4],
        component: ProductComponent,
    },
    {
        path: 'sale',
        caption : 'Pedido de venda',
        icon : 'add_shopping_cart',
        permissao : [4],
        component: SaleComponent,
    },
    {
        path: 'frete',
        caption: 'Cadastro de fretes',
        icon: 'card_travel',
        permissao: [4],
        component: ChargeCarryingComponent,
    }
]