from django.shortcuts import render

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger

from base.models import Product, Review
from base.serializers import ProductSerializer

from rest_framework import status


@api_view(['GET'])
def getProducts(request):
    # Get the search keyword and category from query parameters
    keyword = request.query_params.get('keyword', '')
    category = request.query_params.get('category', '')

    # Filter products by keyword if provided
    products = Product.objects.filter(name__icontains=keyword).order_by('-createdAt')

    # Apply category filter if it is provided
    if category:
        products = products.filter(category__iexact=category).order_by('-createdAt')

    # Handle pagination
    page = request.query_params.get('page')
    paginator = Paginator(products, 5)  # Page size of 5 products per page

    try:
        products = paginator.page(page)
    except PageNotAnInteger:
        products = paginator.page(1)
    except EmptyPage:
        products = paginator.page(paginator.num_pages)

    # Set page to 1 if it's not defined (e.g., the first load)
    if page is None:
        page = 1

    page = int(page)
    print('Page:', page)

    # Serialize the paginated products
    serializer = ProductSerializer(products, many=True)

    # Return products with pagination metadata
    return Response({'products': serializer.data, 'page': page, 'pages': paginator.num_pages}, status=status.HTTP_200_OK)



@api_view(['GET'])
def getTopProducts(request):

    rated_products = Product.objects.filter(rating__isnull=False).order_by('-rating')[:5]
    
    if rated_products.count() < 5:
        unrated_products = Product.objects.filter(rating__isnull=True)[:(5 - rated_products.count())]
        products = list(rated_products) + list(unrated_products)
    else:
        products = rated_products

    serializer = ProductSerializer(products, many=True)

    return Response(serializer.data)


@api_view(['GET'])
def getProduct(request, pk):
    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['GET'])
def getCategory(request):
    categories = Product.objects.values_list('category', flat=True).distinct()
    return Response(categories)



@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user

    product = Product.objects.create(
        user=user,
        name='',
        price=0,
        brand='',
        countInStock=0,
        category='',
        description=''
    )

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name = data['name']
    product.price = data['price']
    product.brand = data['brand']
    product.countInStock = data['countInStock']
    product.category = data['category']
    product.description = data['description']

    product.save()

    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Producted Deleted')


@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data['product_id']
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get('image')
    product.save()

    return Response('Image was uploaded')


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    # 1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()
    if alreadyExists:
        content = {'detail': 'Product already reviewed'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 2 - No Rating or 0
    elif data['rating'] == 0:
        content = {'detail': 'Please select a rating'}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    # 3 - Create review
    else:
        review = Review.objects.create(
            user=user,
            product=product,
            name=user.first_name,
            rating=data['rating'],
            comment=data['comment'],
        )

        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total += i.rating

        product.rating = total / len(reviews)
        product.save()

        return Response('Review Added')

