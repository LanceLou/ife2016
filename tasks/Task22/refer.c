void postorder_travese_norec(tree root, void(*visit)(node))
{
	tree stack[32];
	int top = 0;
	tree p = root;
	tree lastvisit = NULL; //用于标记上次访问的节点
	for(; top<32; top++)
	{
		stack[top] = NULL;
	}
	top = 0;
	while(p != NULL || top > 0)
	{
		while(p != NULL)
		{
			stack[top++] = p;  //将所有左子树压入栈中
			p = p->lchild;
		}

		p = stack[top - 1];  //注意这里，不是p = stack[—-top],因为我们还不知道是否要访问p

		if(p->rchild == NULL || lastvisit == p->rchild) //判断p的右子树是否访问过或者是否为空
		{
			visit(*p);//如果p的右子树为空或者已经访问过，则访问p
			lastvisit = p;//标记上次访问的是节点p
			top--; //这里p已经访问过，则将栈中的p弹出即可

			p = NULL;
		}
		else
		{
			//发现新节点
			p = p->rchild;  //如果p的右子树还没有访问过，那么访问其右子树
		}
	}
}