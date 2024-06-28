using API.DTOs;
using API.Entities;
using AutoMapper;

namespace API.Utils;

public class MapperProfiles : Profile
{
    public MapperProfiles()
    {
        CreateMap<Basket, BasketDto>();
        CreateMap<BasketItem, BasketItemDto>()
            .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Product.Name))
            .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Product.Price))
            .ForMember(dest => dest.PictureUrl, opt => opt.MapFrom(src => src.Product.PictureUrl))
            .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Product.Brand))
            .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Product.Type));
    }
}